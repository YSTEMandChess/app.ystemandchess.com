Feature: Navigation

    Scenario Outline: The the Company logo shall take the user to the Home page
        Given the user is on <any> page
        And the navigation is displayed
        When they use the Company logo link
        Then they are taken to the Home page
        Examples:
            | any         |
            | Play        |
            | Lessons     |
            | Be A Mentor |
            | Programs    |
            | Contact     |
            | FAQ         |

    Scenario: The the Play link shall take the user to the Play page
        Given the user is on the landing page
        And the navigation is displayed
        When they use the Play link
        Then they are taken to the Play page

    Scenario: The the Lessons link shall take the user to the Lessons page
        Given the user is on the landing page
        And the navigation is displayed
        When they use the Lessons link
        Then they are taken to the Lessons page

    Scenario: The the Be A Mentor link shall take the user to the Be A Mentor page
        Given the user is on the landing page
        And the navigation is displayed
        When they use the Be A Mentor link
        Then they are taken to the Be A Mentor page

    Scenario: The the Programs link shall take the user to the Programs page
        Given the user is on the landing page
        And the navigation is displayed
        When they use the Programs link
        Then they are taken to the Programs page

    Scenario: The the Contact link shall take the user to the Contact page
        Given the user is on the landing page
        And the navigation is displayed
        When they use the Contact link
        Then they are taken to the Contact page

    Scenario: The the FAQ link shall take the user to the FAQ page
        Given the user is on the landing page
        And the navigation is displayed
        When they use the FAQ link
        Then they are taken to the FAQ page

    Scenario: The the Donate button shall take the user to the Donate page
        Given the user is on the landing page
        And the navigation is displayed
        When they use the Donate button
        Then they are taken to the Donate page

    Scenario: The the Login button shall take the user to the Login page
        Given the user is on the landing page
        And the navigation is displayed
        When they use the Login button
        Then they are taken to the Login page