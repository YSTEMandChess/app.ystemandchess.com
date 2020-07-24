import requests
import time
TIMEOUT=60

#TODO: Fill in AppId, Basic Auth string, Cname (channel name), and cloud storage information
APPID="6c368b93b82a4b3e9fb8e57da830f2a4"
Auth="Basic OTE3ZTZlOTlmODgxNDEwYWI2ZjEyNmY3ZTJiMWM5MDc6NWYwMTU0MTIwMmM3NDYzNzhjZTQ3Nzg3NTljYzg4NGE="
Cname="10000"-
ACCESS_KEY="AKIA3W5HAAMI6L45OV5X"
SECRET_KEY="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"
VENDOR = 1
REGION = 1
BUCKET = "ystemandchess-meeting-recordings"

url="https://api.agora.io/v1/apps/%s/cloud_recording/" % APPID

acquire_body={
        "uid": "123",
        "cname": Cname,
        "clientRequest": {}
        }

#Set up two regions for two users
layoutConfig = [{"x_axis": 0.0, "y_axis": 0.0, "width": 0.3, "height": 0.3, "alpha": 0.9, "render_mode": 1},
                {"x_axis": 0.3, "y_axis": 0.0, "width": 0.3,"height": 0.3, "alpha": 0.77, "render_mode": 0}]
start_body={
        "uid": "123",
        "cname": Cname,
        "clientRequest": {
            "storageConfig": {
                "secretKey": SECRET_KEY,
                "region": REGION,
                "accessKey": ACCESS_KEY,
                "bucket": BUCKET,
                "vendor": VENDOR
                },
            "recordingConfig": {
                "audioProfile": 0,
                "channelType": 0,
                "maxIdleTime": 30,
                "transcodingConfig": {
                    "width": 640,
                    "height": 360,
                    "fps": 15,
                    "bitrate": 600,
                    "mixedVideoLayout": 3,
                    "backgroundColor": "#fff000",
                    "layoutConfig": layoutConfig
                    }
                }
            }
        }

update_body = {
        "uid": "123",
        "cname": Cname,
        "clientRequest":{
            "mixedVideoLayout": 3,
            "backgroundColor": "#ff00cc",
            "layoutConfig":layoutConfig
        }
}
stop_body={
        "uid": "123",
        "cname": Cname,
        "clientRequest": {}
        }


def cloud_post(url, data=None,timeout=TIMEOUT):
    headers = {'Content-type': "application/json;charset=utf-8", "Authorization": Auth}

    try:
        response = requests.post(url, json=data, headers=headers, timeout=timeout, verify=False)
        #print("url: %s, request body:%s response: %s" %(url, response.request.body,response.json()))
        return response
    except requests.exceptions.ConnectTimeout:
        raise Exception("CONNECTION_TIMEOUT")
    except requests.exceptions.ConnectionError:
        raise Exception("CONNECTION_ERROR")

def cloud_get(url, timeout=TIMEOUT):
    headers = {'Content-type':"application/json", "Authorization":Auth}
    try:
        response = requests.get(url, headers=headers, timeout=timeout, verify=False)
        #print("url: %s,request:%s response: %s" %(url,response.request.body, response.json()))
        return response
    except requests.exceptions.ConnectTimeout:
        raise Exception("CONNECTION_TIMEOUT")
    except requests.exceptions.ConnectionError:
        raise Exception("CONNECTION_ERROR")
    print("Testing2")
def start_record():
    acquire_url = url+"acquire"
    r_acquire = cloud_post(acquire_url, acquire_body)
    if r_acquire.status_code == 200:
        resourceId = r_acquire.json()["resourceId"]
        print(resourceId)
    else:
        print("Acquire error! Code: %s Info: %s" %(r_acquire.status_code, r_acquire.json()))
        return False

    
    start_url = url+ "resourceid/%s/mode/mix/start" % resourceId
    r_start = cloud_post(start_url, start_body)
    if r_start.status_code == 200:
        sid = r_start.json()["sid"]
    else:
        print("Start error! Code:%s Info:%s" %(r_start.status_code, r_start.json()))
        return False

    time.sleep(30)
    query_url = url + "resourceid/%s/sid/%s/mode/mix/query" %(resourceId, sid)
    r_query = cloud_get(query_url)
    if r_query.status_code == 200:
        print("The recording status: %s" % r_query.json())
    else:
        print("Query failed. Code %s, info: %s" % (r_query.status_code, r_query.json()))

    time.sleep(10)

    stop_url = url+"resourceid/%s/sid/%s/mode/mix/stop" % (resourceId, sid)
    r_stop = cloud_post(stop_url, stop_body)
    if r_stop.status_code == 200:
        print("Stop cloud recording success. FileList : %s, uploading status: %s"
            %(r_stop.json()["serverResponse"]["fileList"], r_stop.json()["serverResponse"]["uploadingStatus"]))
    else:
        ##print("Stop failed! Code: %s Info: %s" % r_stop.status_code, r_stop.json())
        print(r_stop.status_code)

start_record()

