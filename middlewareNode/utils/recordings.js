const axios = require("axios");
const config = require("config");

const startRecording = async (meetingID) => {
  try {
    //Set the body and query url to create a recording session
    const appId = config.get("appID");
    const uid = config.get("uid");
    const auth = {
      username: config.get("customerId") || "",
      password: config.get("customerCertificate") || "",
    };
    let body = {
      cname: meetingID,
      uid,
      clientRequest: { resourceExpiredHour: 24 },
    };
    let newQueryURL = `https://api.agora.io/v1/apps/${appId}/cloud_recording/acquire`;

    //POST request to obtain an agora recording session
    const { data } = await axios.post(newQueryURL, body, {
      headers: {
        "Content-type": "application/json;charset=utf-8",
      },
      auth,
    });
    if (!data) {
      return "Could not start recording. Server Error";
    }

    //Set the new body and query url to start the recording session
    newQueryURL = `https://api.agora.io/v1/apps/${appId}/cloud_recording/resourceid/${data?.resourceId}/mode/mix/start`;
    body = {
      uid,
      cname: meetingID,
      clientRequest: {
        storageConfig: {
          secretKey: config.get("awsSecretKey"),
          region: 1,
          accessKey: config.get("awsAccessKey"),
          bucket: "ystemandchess-meeting-recordings",
          vendor: 1,
        },
        recordingConfig: {
          audioProfile: 1,
          channelType: 0,
          maxIdleTime: 200,
          transcodingConfig: {
            width: 1280,
            height: 720,
            fps: 15,
            bitrate: 600,
            mixedVideoLayout: 3,
            backgroundColor: "#000000",
            layoutConfig: [
              {
                x_axis: 0.7,
                y_axis: 0,
                width: 0.2,
                height: 0.4,
                alpha: 1,
                render_mode: 1,
              },
              {
                x_axis: 0.7,
                y_axis: 0.6,
                width: 0.2,
                height: 0.4,
                alpha: 1,
                render_mode: 1,
              },
              {
                uid: "1000000008",
                x_axis: 0,
                y_axis: 0,
                width: 0.8,
                height: 1,
                alpha: 1,
                render_mode: 1,
              },
            ],
          },
        },
        recordingFileConfig: {
          avFileType: ["hls", "mp4"],
        },
      },
    };

    //POST request to start the agora recording session we obtained from above
    const secondResponse = await axios.post(newQueryURL, body, {
      headers: {
        "Content-type": "application/json;charset=utf-8",
      },
      auth,
    });
    if (!secondResponse) {
      return "Could not start recording. Server error.";
    }

    //Return the resourceId and sid used to identify the recording session
    return {
      sid: secondResponse.data.sid,
      resourceId: data.resourceId,
    };
  } catch (error) {
    console.error(error);
    return "Could not start recording. Server error.";
  }
};

//Async function to stop the agora recording session
const stopRecording = async (meetingID, resourceId, sid) => {
  //Set the body and query url to stop an agora recording session
  try {
    const auth = {
      username: config.get("customerId") || "",
      password: config.get("customerCertificate") || "",
    };
    let newQueryURL = `https://api.agora.io/v1/apps/${config.appID}/cloud_recording/resourceid/${resourceId}/sid/${sid}/mode/mix/stop`;
    const body = {
      uid: config.get("uid"),
      cname: meetingID,
      clientRequest: {},
    };

    //POST request to stop the recording and return the response from agora
    let response = await axios.post(newQueryURL, body, {
      headers: {
        "Content-type": "application/json;charset=utf-8",
      },
      auth,
    });

    if (!response) {
      return "Could not stop recording. Server error.";
    }

    return response.data.serverResponse;
  } catch (error) {
    return "Could not stop recording. Server error.";
  }
};

module.exports = {
  startRecording,
  stopRecording,
};
