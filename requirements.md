# Phase 4: Requirements
###### Team: EnrichCulture
* **Hongyiming (Marina) Cui** (Project Manager)
* **Siyuan (Adam) Ji** (Developer)
* **Junjie (Victoria) Wei** (Developer)
* **Zonglin Zuo** (Project Designer)

### Requirements

* **Navigation Bar**

    **complete #54** n1a. The webpage will display all the usual features in the navigation bar (Enrich Culture, Diversity, Festival, Q&A). However, the 'login' option will prominently appear on the right side of the navigation bar, indicating to users that they are currently not logged in.

    **complete #54** n1b. The webpage will display all the usual features in the navigation bar (Enrich Culture, Diversity, Festival, Q&A). The user's avatar will be displayed on the right side of the navigation bar, indicating that they are currently logged into their account.

* **Sign up Page**

    - When user have not sign up before

        **complete #54** su1a. The page will display essential fields for user registration, such as first name, last name, Gmail, and password. 
        
        **complete #54** su1b. After user clicks submit, If any of the required fields are left blank, the page will display a message indicating that necessary information is missing and request the user to review and complete it.
        
        **complete #54** su1c. If the information that the user entered is invalid, for example, the email address missing @, that input box will turn red.
        
        **impossible: cost money** su1d. Users can use a Google account to login.
        
        **complete #54** su1e. If a user realizes they already possess an account, they can select the 'Log in' button to return to the sign-in page.
    
    - When user finished their sign up process
        
        **complete #54** su2a. Once the user has successfully created an account, the page will automatically redirect to the login page for the user to sign in.
    
    - Error
        
        **complete #54** su3a. If a user has previously registered using the same gmail, the page will notify the user that the account already exists.

* **Sign in Page**

    - When users are not logged in before, the sign in page will contain:
        
        **complete #54** si1a. The page showcases the sign-in form provided by Firebase Auth. 
        
        **complete #54** si1b. “New to Enrich Culture? Sign up for free.” button that directs the users to the sign-up page.
    
    - When user login the account:
        
        **complete #54** si2a. Once users log in, the system will direct them back to the page they were previously viewing that asks for sign in.
        
        **complete #54** si2b. If the login was their first action, they will be redirected to the homepage by default.
    
    - Error
        
        **complete #54** si3a. If the user inputs an incorrect password or an unmatched Gmail address, the system will display an error message to alert the user that there's an issue with their password or Gmail account. 

* **User Account Page**

    - Before you login your account:

        **complete #54** u1a. If you haven't logged into your personal account, the page will prompt you to sign in before proceeding further.
    
    - After you login your account:
    
        **complete #54** u2a. To access this page, simply click on the user avatar, and you will be directed to your user account.

        **complete #54 & #61 & #65** u2b. The page will show the user's fundamental details along with their posts, likes. It includes statistics such as the number of followers they have, posts they've made, and accounts they're following. 

        **complete #54** u2c. It has a feature that allows users to edit their profile.
    
* **User account Setting Page**

    - User must to login to access this page

        **complete #54** ua1a. This page allows users to update the basic information associated with their account. It doesn't require much private information, and the provision of details is mostly optional. Available fields include last name, first name, bio, location, privacy and notification settings. 

        **complete #54 & #62 & #66** ua1b. The privacy and notification settings consist of toggle buttons that enable users to customize their preferences. These buttons allow users to easily turn on or off notifications and choose between making their account private or public.

        **complete #54** ua1c. Another enhancement we will include is an optional location sharing feature. This will be represented as a dropdown menu for user convenience. It's important to note that this is completely optional for users, they always have the choice to leave it blank or choose the first option "Leave blank".

        **complete #54** ua1d. Users also have the ability to modify their profile picture using the 'Edit photo or avatar' feature. 

        **complete #54** ua1e. Once all changes have been made, users can save these by clicking on 'Done'.

        **complete #54** ua1f. Once the user completes their edits, they have the option to navigate to a different page or press a button to return to the User Account page.

* **Other user account Page**

    - If you want to check other users’ account, you must login your personal account
        
        **complete #58** o1a. This page enables users to explore the basic details and posts of other users. It provides statistics such as the number of followers, posts created, and followed accounts of the public user.
        
        **complete #67** o1b. If the user hasn't made any posts yet, the message "User hasn't posted anything yet!" will appear.
        
        **complete #58** o1c. It features options allowing users to follow the public user's account or get their contact information or email. 

    - If other user account set as private
        
        **complete #58** o2a. Only the user's avatar will be displayed, with all other information signifying that the author prefers to remain private. Nonetheless, you still have the option to send a follow request to the user.

* **Homepage**

    - When users are not logged in, the homepage will contain the following

        **complete #56** h1a. The‘ Enrich culture’ tab in the navigation bar will be semi-bold, indicating to the user that they are currently viewing the home page.

        **complete #56 & #71 & #72 & #74 & #75 & #77 & #78** h1b. A short slogan, and some users post pictures under "explore diversity". When a user clicks on one of the pictures under “explore diversity”, it will jump to the diversity page.

        **complete #56** h1c. At the bottom of the home page, there will be a search bar providing a way for users to enter search queries and retrieve related information. There are two ways for users to search: 

            complete #56 h1ca. Users can search by entering key words about culture in the search box below. 

            complete #56 h1cb. The user enters keywords to search for information. During this  search process, there will be no prompt information in the search box, and the user needs to completely enter keywords and click the Enter key to search.

    - When the user logins to the account: 

        **complete #56** h2a. The‘ Enrich culture’ tab in the navigation bar will be semi-bold, indicating to the user that they are currently viewing the home page.
        
        **complete #56 & #71 & #72 & #74 & #75 & #77 & #78** h2b. A short slogan, and some users post pictures under "explore diversity". When a user clicks on one of the pictures under “explore diversity”, it will jump to a diversity page.
        
        **complete #56** h2c. At the bottom of the home page, there will be a search bar providing a way for users to enter search queries and retrieve related information. There are two ways for users to search: 

            complete #56 h2ca. Users can search by entering key words about culture in the search box below. 
            
            complete #56 h2cb. The user enters keywords to search for information. During this search process, there will be no prompt information in the search box, and the user needs to completely enter keywords and click the Enter key to search.
    - Error: 
    
        **complete #76** h3a. If a user requests a path that does not exist, an error interface typically handles the situation by displaying a 404 Error page, indicating that the requested page was not found.

        **complete #56** h3b. If the keywords the user searches in the search box do not appear in the database, the page will display not found and prompt the user to search again.

* **Diversity Page**

    - When user are not log-in, the diversity page will contain the following
    
        **complete #57** d1a. The‘ Diversity' tab in the navigation bar will be semi-bold, indicating to the user that they are currently viewing the diversity page.

        **impossible: Will cost money because of large data reading** d1b. On the diversity page, posts will be prioritized and recommended by the location that user chose to disclose.
        
        **complete: enhanced #57** d1c. Users can see all posts and also browse. When the users click on “read more” under the post shown on this page, it will jump to the “diversity post page,” where they can see the full content of the clicked post. 
        
        **complete #57** d1d. The user can see every like-button on the post. When users are trying to click on the like-button, they will be directed to the sign-up page. 

        **complete #57** d1e. If users want to go back to the homepage, they can click “Enrich Culture”, and then It will return to the home page.

    - When the user logins to the account: 

        **complete #57** d2a. The‘ Diversity' tab in the navigation bar will be semi-bold, indicating to the user that they are currently viewing the diversity page.

        **complete #57** d2b. On the diversity page, posts from this shared location will be prioritized and recommended first.

        **complete #57** d2c. The user's avatar will be displayed on the right side of the navigation bar.

        **complete #57** d2d. Users can see all posts and also browse. When the users click on “read more” under the post shown on this page, it will jump to the “diversity post page,” where they can see the full content of the clicked post.

        **complete #57** d2e. Like buttons appear: Users can like the posts by clicking on the like-button.

        **complete #57** d2f. If users want to go back to the homepage, they can click “Enrich Culture”, and then It will return to the home page.

* **Diversity Post Page**

    - Before user login their account, this page will have

        **complete #79** dp1a. The diversity tab in the navigation bar will be semi-bold, indicating to the user that they are currently inside of the diversity page.
        
        **complete #57** dp1b. This page allows users to explore a post. It features the post's image, details about the person who made the post, along with any comments and hashtags they've included within the post.
        
        **complete #73** dp1c. This page provides a feature that allows users to delve into the profile of the post's author. However, viewing another user's profile requires that one is logged into their account.
        
        **complete #57** dp1d. They have the option to navigate to a different page or press a button “return” to return to the diversity page.
    
    - After user login their account, this page will have
        
        **complete #79** dp2a. The diversity tab in the navigation bar will be semi-bold, indicating to the user that they are currently inside of the diversity page.

        **complete #57** dp2b. This page allows users to explore a post they like. It features the post's image, details about the person who made the post, along with any comments and hashtags they've included within the post.
        
        **complete #57 & #60** dp2c. The page includes a feature that enables users to investigate the profile of the post creator. Users can open this profile to browse through the other posts made by the same individual.

        **complete #57** dp2d. They have the option to navigate to a different page or press a button “return” to return to the diversity page.

    - Limitation
        
        **complete #57** dp3a. If the author of the post has chosen to set their account to private in their personal account setting page, other users will not have the ability to view other posts created by the same author. It will indicate that the author has chosen to remain private.


* **Festival Page**

    - Before user login their account, this page will have
        
        **complete #63** f1a. The 'Festival' tab in the navigation bar will be semi-bold, indicating to the user that they are currently viewing the Festival page.

        **complete #63** f1b. This webpage will showcase public posts related to various festivals. Users can utilize the filter tool on the left side to customize their browsing experience based on their interests. The filter operates as a checklist; as soon as a user clicks on a category, the page will instantly update to display the relevant posts.
        
        **complete #63** f1c. This page also includes a 'like' feature that allows users to bookmark the posts they find interesting. However, if a user hasn't logged in and attempts to use this feature, they will be automatically redirected to the Login page.
    
    - After user login their account, this page will have:
        
        **complete #63** f2a. The 'Festival' tab in the navigation bar will be semi-bold, indicating to the user that they are currently viewing the Festival page.
    
        **complete #63** f2b. This webpage will showcase public posts related to various festivals. Users can utilize the filter tool on the left side to customize their browsing experience based on their interests. The filter operates as a checklist; as soon as a user clicks on a category, the page will instantly update to display the relevant posts.
        
        **complete #63** f2c. Upon clicking the 'like' icon, the corresponding post will be automatically added to the user's list of favorite posts within their account.

    - Limitation

        **complete #63** f3a. When users apply filters to refine their search, if no events match the selected filter criteria, the page will display an empty state and show a message stating "No results found."

* **Festival Post Page**

    - Before user login their account, this page will have

        **complete #79** fp1a. The 'Festival' tab in the navigation bar will be semi-bold, indicating to the user that they are currently inside of the Festival page.

        **complete #57** fp1b. This page allows users to explore a post they like. It features the post's image, details about the person who made the post, along with any comments and hashtags they've included within the post.

        **complete #73** fp1c. This page provides a feature that allows users to delve into the profile of the post's author. However, viewing another user's profile necessitates that one is logged into their account.

        **complete #57** fp1d. They have the option to navigate to a different page or press a button to return to the Festival page.
    
    - After user login their account, this page will have

        **complete #79** fp2a. The 'Festival' tab in the navigation bar will be semi-bold, indicating to the user that they are currently inside of the Festival page.

        **complete #57** fp2d. This page allows users to explore a post they like. It features the post's image, details about the person who made the post, along with any comments and hashtags they've included within the post.

        **complete #57 & #60** fp2c. The page includes a feature that enables users to investigate the profile of the post creator. Users can open this profile to browse through the other posts made by the same individual.

        **complete #57** fp2d. They have the option to navigate to a different page or press a button to return to the Festival page.
    - Limitation
        
        **complete #57** fp3a. If the author of the post has chosen to set their account to private in their personal account setting page, other users will not have the ability to view other posts created by the same author. It will indicate that the author has chosen to remain private.

* **Non-functional Requirements**

    - Security:
    
        **complete** nf1a. Access: All account information can only be viewed by IT personnel. 
        
        **complete** nf1b. Authentication: Users can only log in through legitimate email addresses.

        **complete** nf1c. Authorization

            complete nf1ca. Before logging in,

                Users can only view posts on the home, diversity, and festival pages. They are unable to access other users' information or use features that require data storage in their personal account, such as liking a post.
            
            complete nf1cb. After logging in,

                Users have the ability to view all posts from other users and can engage with various features of this app, including liking posts and following other users. 

    - Localization:
        
        **complete** nf2a. Date: The displayed date will adjust based on the time differences across various regions and countries.

        **complete** nf2b. Location: The system prioritizes posts based on your location for recommendations. For instance, if you're in the United States, it will first suggest culture-related posts relevant to the US.

    - Performance:
        
        **complete** nf3a. To ensure a smooth user experience, the website is designed to load within 3 seconds.
