# Phase 4: Requirements
###### Team: EnrichCulture
* **Hongyiming (Marina) Cui** (Project Manager)
* **Siyuan (Adam) Ji** (Developer)
* **Junjie (Victoria) Wei** (Developer)
* **Zonglin Zuo** (Project Designer)

### Requirements

* **Navigation Bar**

    a. The webpage will display all the usual features in the navigation bar (Enrich Culture, Diversity, Festival, Q&A). However, the 'login' option will prominently appear on the right side of the navigation bar, indicating to users that they are currently not logged in.

    b. The webpage will display all the usual features in the navigation bar (Enrich Culture, Diversity, Festival, Q&A). The user's avatar will be displayed on the right side of the navigation bar, indicating that they are currently logged into their account.

* **Sign up Page**

    a. When user have not sign up before

        1. The page will display essential fields for user registration, such as first name, last name, Gmail, and password. 
        
        2.After user clicks submit, If any of the required fields are left blank, the page will display a message indicating that necessary information is missing and request the user to review and complete it.
        
        3. If the information that the user entered is invalid, for example, the email address missing @, that input box will turn red.
        
        4. Users can use a Google account to login.
        
        5. If a user realizes they already possess an account, they can select the 'Log in' button to return to the sign-in page.
    
    b. When user finished their sign up process
        
        1. Once the user has successfully created an account, the page will automatically redirect to the login page for the user to sign in.
    
    c. Error
        
        1. If a user has previously registered using the same gmail, the page will notify the user that the account already exists.

* **Sign in Page**

    a. When users are not logged in before, the sign in page will contain:
        
        1. The page showcases the sign-in form provided by Firebase Auth. 
        
        2. “New to Enrich Culture? Sign up for free.” button that directs the users to the sign-up page.
    
    b. When user login the account:
        
        1. Once users log in, the system will direct them back to the page they were previously viewing that asks for sign in.
        
        2. If the login was their first action, they will be redirected to the homepage by default.
    
    c. Error
        
        1. If the user inputs an incorrect password or an unmatched Gmail address, the system will display an error message to alert the user that there's an issue with their password or Gmail account. 

* **User Account Page**

    a. Before you login your account:

        1. If you haven't logged into your personal account, the page will prompt you to sign in before proceeding further.
    
    b. After you login your account:
    
        1. To access this page, simply click on the user avatar, and you will be directed to your user account.

        2. The page will show the user's fundamental details along with their posts, likes. It includes statistics such as the number of followers they have, posts they've made, and accounts they're following. 

        3. It has a feature that allows users to edit their profile.
    
* **User account Setting Page**

    a. User must to login to access this page

        1. This page allows users to update the basic information associated with their account. It doesn't require much private information, and the provision of details is mostly optional. Available fields include last name, first name, bio, location, privacy and notification settings. 

        2. The privacy and notification settings consist of toggle buttons that enable users to customize their preferences. These buttons allow users to easily turn on or off notifications and choose between making their account private or public.

        3. Another enhancement we will include is an optional location sharing feature. This will be represented as a dropdown menu for user convenience. It's important to note that this is completely optional for users, they always have the choice to leave it blank or choose the first option "Leave blank".

        4. Users also have the ability to modify their profile picture using the 'Edit photo or avatar' feature. 

        5. Once all changes have been made, users can save these by clicking on 'Done'.

        6. Once the user completes their edits, they have the option to navigate to a different page or press a button to return to the User Account page.

* **Other user account Page**

    a. If you want to check other users’ account, you must login your personal account
        
        1. This page enables users to explore the basic details and posts of other users. It provides statistics such as the number of followers, posts created, and followed accounts of the public user.
        
        2. If the user hasn't made any posts yet, the message "User hasn't posted anything yet!" will appear.
        
        3. It features options allowing users to follow the public user's account or get their contact information or email. 

    b. If other user account set as private
        
        1. Only the user's avatar will be displayed, with all other information signifying that the author prefers to remain private. Nonetheless, you still have the option to send a follow request to the user.

* **Homepage**

    a. When users are not logged in, the homepage will contain the following

        1. The‘ Enrich culture’ tab in the navigation bar will be semi-bold, indicating to the user that they are currently viewing the home page.

        2. A short slogan, and some users post pictures under "explore diversity". When a user clicks on one of the pictures under “explore diversity”, it will jump to the diversity page.

        3. At the bottom of the home page, there will be a search bar providing a way for users to enter search queries and retrieve related information. There are two ways for users to search: 

            a. Users can search by entering key words about culture in the search box below. 

            b. The user enters keywords to search for information. During this  search process, there will be no prompt information in the search box, and the user needs to completely enter keywords and click the Enter key to search.

    b. When the user logins to the account: 

        1. The‘ Enrich culture’ tab in the navigation bar will be semi-bold, indicating to the user that they are currently viewing the home page.
        
        2. A short slogan, and some users post pictures under "explore diversity". When a user clicks on one of the pictures under “explore diversity”, it will jump to a diversity page.
        
        3. At the bottom of the home page, there will be a search bar providing a way for users to enter search queries and retrieve related information. There are two ways for users to search: 

            a. Users can search by entering key words about culture in the search box below. 
            
            b. The user enters keywords to search for information. During this search process, there will be no prompt information in the search box, and the user needs to completely enter keywords and click the Enter key to search.
    c. Error: 
    
        1. If a user requests a path that does not exist, an error interface typically handles the situation by displaying a 404 Error page, indicating that the requested page was not found.

        2. If the keywords the user searches in the search box do not appear in the database, the page will display not found and prompt the user to search again.

* **Diversity Page**

    a. When user are not log-in, the diversity page will contain the following
    
        1. The‘ Diversity' tab in the navigation bar will be semi-bold, indicating to the user that they are currently viewing the diversity page.

        2. On the diversity page, posts will be prioritized and recommended by the location that user chose to disclose.
        
        3. Users can see all posts and also browse. When the users click on “read more” under the post shown on this page, it will jump to the “diversity post page,” where they can see the full content of the clicked post. 
        
        4. The user can see every like-button on the post. When users are trying to click on the like-button, they will be directed to the sign-up page. 

        If users want to go back to the homepage, they can click “Enrich Culture”, and then It will return to the home page.

    b. When the user logins to the account: 

        1. The‘ Diversity' tab in the navigation bar will be semi-bold, indicating to the user that they are currently viewing the diversity page.

        2. On the diversity page, posts from this shared location will be prioritized and recommended first.

        3. The user's avatar will be displayed on the right side of the navigation bar.

        4. Users can see all posts and also browse. When the users click on “read more” under the post shown on this page, it will jump to the “diversity post page,” where they can see the full content of the clicked post.

        5. Like buttons appear: Users can like the posts by clicking on the like-button.

        If users want to go back to the homepage, they can click “Enrich Culture”, and then It will return to the home page.

* **Diversity Post Page**

    a. Before user login their account, this page will have

        1. The diversity tab in the navigation bar will be semi-bold, indicating to the user that they are currently inside of the diversity page.
        
        2. This page allows users to explore a post. It features the post's image, details about the person who made the post, along with any comments and hashtags they've included within the post.
        
        3. This page provides a feature that allows users to delve into the profile of the post's author. However, viewing another user's profile requires that one is logged into their account.
        
        4. They have the option to navigate to a different page or press a button “return” to return to the diversity page.
    
    b. After user login their account, this page will have
        
        1. The diversity tab in the navigation bar will be semi-bold, indicating to the user that they are currently inside of the diversity page.

        2. This page allows users to explore a post they like. It features the post's image, details about the person who made the post, along with any comments and hashtags they've included within the post.
        
        3. The page includes a feature that enables users to investigate the profile of the post creator. Users can open this profile to browse through the other posts made by the same individual.

        4. They have the option to navigate to a different page or press a button “return” to return to the diversity page.

    c. Limitation
        
        1. If the author of the post has chosen to set their account to private in their personal account setting page, other users will not have the ability to view other posts created by the same author. It will indicate that the author has chosen to remain private.


* **Festival Page**

    a. Before user login their account, this page will have
        
        1. The 'Festival' tab in the navigation bar will be semi-bold, indicating to the user that they are currently viewing the Festival page.

        2. This webpage will showcase public posts related to various festivals. Users can utilize the filter tool on the left side to customize their browsing experience based on their interests. The filter operates as a checklist; as soon as a user clicks on a category, the page will instantly update to display the relevant posts.
        
        3. This page also includes a 'like' feature that allows users to bookmark the posts they find interesting. However, if a user hasn't logged in and attempts to use this feature, they will be automatically redirected to the Login page.
    
    b. After user login their account, this page will have:
        
        1. The 'Festival' tab in the navigation bar will be semi-bold, indicating to the user that they are currently viewing the Festival page.
        
        2. This webpage will showcase public posts related to various festivals. Users can utilize the filter tool on the left side to customize their browsing experience based on their interests. The filter operates as a checklist; as soon as a user clicks on a category, the page will instantly update to display the relevant posts.
        
        3. Upon clicking the 'like' icon, the corresponding post will be automatically added to the user's list of favorite posts within their account.

    c. Limitation

        1. When users apply filters to refine their search, if no events match the selected filter criteria, the page will display an empty state and show a message stating "No results found."

* **Festival Post Page**

    a. Before user login their account, this page will have

        1. The 'Festival' tab in the navigation bar will be semi-bold, indicating to the user that they are currently inside of the Festival page.

        2. This page allows users to explore a post they like. It features the post's image, details about the person who made the post, along with any comments and hashtags they've included within the post.

        3. This page provides a feature that allows users to delve into the profile of the post's author. However, viewing another user's profile necessitates that one is logged into their account.

        4. They have the option to navigate to a different page or press a button to return to the Festival page.
    
    b. After user login their account, this page will have

        1. The 'Festival' tab in the navigation bar will be semi-bold, indicating to the user that they are currently inside of the Festival page.

        2. This page allows users to explore a post they like. It features the post's image, details about the person who made the post, along with any comments and hashtags they've included within the post.

        3. The page includes a feature that enables users to investigate the profile of the post creator. Users can open this profile to browse through the other posts made by the same individual.

        4. They have the option to navigate to a different page or press a button to return to the Festival page.
    c. Limitation
        
        1. If the author of the post has chosen to set their account to private in their personal account setting page, other users will not have the ability to view other posts created by the same author. It will indicate that the author has chosen to remain private.

* **Non-functional Requirements**

    a. Security:
        1. Access:
            
            a. All account information can only be viewed by IT personnel. 
        
        2. Authentication
    
            a. Users can only log in through legitimate email addresses.

        3. Authorization

            a. Before logging in

                i. Users can only view posts on the home, diversity, and festival pages. They are unable to access other users' information or use features that require data storage in their personal account, such as liking a post.
            
            b. After logging in

                i. Users have the ability to view all posts from other users and can engage with various features of this app, including liking posts and following other users. 

    b. Localization:
        
        1. Date
        
            a. The displayed date will adjust based on the time differences across various regions and countries.

        2. Location
        
            a. The system prioritizes posts based on your location for recommendations. For instance, if you're in the United States, it will first suggest culture-related posts relevant to the US.

    c. Performance:
        
        1. To ensure a smooth user experience, the website is designed to load within 3 seconds.
