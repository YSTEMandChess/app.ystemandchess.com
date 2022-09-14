Feature: Footer

    Scenario: The the Boise Rescue Mission partners link shall redirect the user to Boise Rescue Mission site
        Given the user is on the landing page
        And the footer is displayed
        When they use the Boise Rescue Mission partners link
        Then they are taken to the Boise Rescue Mission site

    Scenario: The the Boise District conmunity school partners link shall redirect the user to Boise Rescue Mission site
        # Requirement currently fails taking user to 'https://neighborworksboise.com/' instead of 'https://www.boiseschools.org/'
        Given the user is on the landing page
        And the footer is displayed
        When they use the Boise District conmunity school partners link
        Then they are taken to the Boise District conmunity school site

    Scenario: The the Boys and girls clubs of ada county partners link shall redirect the user to Boise Rescue Mission site
        Given the user is on the landing page
        And the footer is displayed
        When they use the Boys and girls clubs of ada county partners link
        Then they are taken to the Boys and girls clubs of ada county site

    Scenario: The the Ventive sponsors link shall redirect the user to Ventive site
        Given the user is on the landing page
        And the footer is displayed
        When they use the Ventive sponsors link
        Then they are taken to the Ventive site

    Scenario: The the LinkedIn social media link shall redirect the user to LinkedIn site
        Given the user is on the landing page
        And the footer is displayed
        When they use the LinkedIn social media link
        Then they are taken to the LinkedIn site

    Scenario: The the Twitter social media link shall redirect the user to Twitter site
        Given the user is on the landing page
        And the footer is displayed
        When they use the Twitter social media link
        Then they are taken to the Twitter site

    Scenario: The the Facebook social media link shall redirect the user to Facebook site
        Given the user is on the landing page
        And the footer is displayed
        When they use the Facebook social media link
        Then they are taken to the Facebook site

    Scenario: The the Instagram social media link shall redirect the user to Instagram site
        Given the user is on the landing page
        And the footer is displayed
        When they use the Instagram social media link
        Then they are taken to the Instagram site

    Scenario: The the DonerBox social media link shall redirect the user to DonerBox site
        Given the user is on the landing page
        And the footer is displayed
        When they use the DonerBox platform link
        Then they are taken to the DonerBox site