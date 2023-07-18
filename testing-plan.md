# Phase 5: Delivery Plan
###### Team: EnrichCulture
* **Hongyiming (Marina) Cui** (Project Manager)
* **Siyuan (Adam) Ji** (Developer)
* **Junjie (Victoria) Wei** (Developer)
* **Zonglin Zuo** (Project Designer)

#### Testing Plan

## Introduction

This testing plan is designed to satisfy the provided requirements and ensure thorough testing of EnrichCulture. It covers the types of testing, the testing process, test environments, defect management processes, and the creation of a user acceptance testing script.

## Types of Testing

The following types of testing will be conducted:
* Acceptance Testing
    - Manual testing to validate that the system meets the specified requirements and satisfies user needs.

## Testing Process:

The testing process will be based on the types of testing to be performed, as follows:
* Acceptance Testing:
    1. Our team will conduct manual acceptance testing.
    2. After integration testing and before deployment, manual acceptance tests will be performed.
    3. Testers will follow the provided user acceptance testing script (see Section: User Acceptance Testing Script).
    4. Test results will be recorded and shared with the team for easy improvement.

## Test Environment:

* Development environment
    1. The code under test will be on each developer's computer.
* Integration and Acceptance Testing Environment
    1. Browser: Tests will be conducted on the latest versions of Google Chrome and Safari.
    2. Devices: The devices used for testing depend on the target audience and the requirements of the application; therefore, we will test via laptops and smartphones to cover a wide range of devices and screen sizes to ensure our website application works well on different platforms.

## Defect Management Process:

The defect management process will be divided into four steps: bug reporting, bug triage, bug fixing, and final verification. Here is a detailed explanation of each step:
* Bug Reporting:Testers will report bugs in the form of bug reports and post them to Discord so that our team members can quickly know about the bug. This document (bug report) will reproduce the operation steps to show the problem, compare the expected results with the actual results, and provide corresponding screenshots or videos.
* Bug Triage: The PM, Marina, will sort these reported bugs by severity and impact on the system, assign priorities to these bugs based on their impact, and let developers make changes.
* Defect Management: The PM will assign developers to fix reported bugs and will prioritize fixes based on data on GitHub. 

## User Acceptance Testing Script:

Test Cases

1. Navigation Bar Content (Requirement: Navigation Bar, n1a)
    * Context: The user is on the homepage.
    * Actions: Observe the navigation bar content.
    * Expected Outcome: The navigation bar displays the correct options: "Enrich Culture," "Diversity," "Festival," and "Q&A." 
    
    <br>

2. Login Indicator (Requirement: Navigation Bar, n1a)
    * Context: The user is not logged in.
    * Actions: Observe the navigation bar content.
    * Expected Outcome: The "login" option is prominently displayed on the right side of the navigation bar, indicating that the user is not logged in.

    <br>

3. User Avatar (Requirement: Navigation Bar, n1b)
    * Context: The user is logged into their account.
    * Actions: Observe the navigation bar content.
    * Expected Outcome: The user's avatar is displayed on the right side of the navigation bar, indicating that the user is logged into their account.

    <br>

4. Sign-Up Form (Requirement: Sign-Up, su1a)
    * Context: The user is not signed up and is on the sign-up page.
    * Actions: Observe the sign-up form.
    * Expected Outcome: The sign-up form is displayed, containing fields for first name, last name, email, and password.

    <br>

5. Error Handling - Empty Required Fields (Requirement: Sign-Up, su1b)
    * Context: The user tries to submit the sign-up form with empty required fields.
    * Actions: Leave one or more required fields, such as first name, last name, email, and password, blank and click Submit.
    * Expected Outcome: The page displays a message indicating that necessary information is missing and requests the user to review and complete it.

    <br>

6. Error Handling - Invalid Email (Requirement: Sign-Up, su1c)
    * Context: The user enters an invalid email address in the sign-up form.
    * Actions: Enter an email address without the "@" symbol and click Submit.
    * Expected Outcome: The email input box turns red, indicating an invalid input.

    <br>

7. Error Handling - Same Email (Requirement: Sign-up, su3a)
    * Context:  User has created an account but is not signed in.
    * Actions: Visit the signup form. Enter the email address for an existing account and valid password. Click "Signup."
    * Expected Outcome: The page will notify the user that the account already exists.

    <br>

8. Sign-In Form (Requirement: Sign In page, si2a and si2b)
    * Context: The user is not logged in and is on the sign-in page.
    * Actions: Observe the sign-in form.
    * Expected Outcome: The sign-in form is displayed, allowing users to enter their email and password. Once logged in, it will be redirected to the homepage by default If the login was their first action. If not, the system will direct them back to the page they were previously viewing that asked for sign in.

    <br>

9. Sign-In Form and Diversity page (Requirement: Sign In page, si2a and si2b, Diversity Page, d1d)
    * Context: The user is not logged in and is on the Diversity page.
    * Actions: Click on the like button to be directed to the sign-in page
    * Expected Outcome: The sign-in form is displayed, allowing users to enter their email and password. Once logged in, it will be redirected to the Diversity page where they were browsing.

    <br>

10. Profile Edit (Requirement: User Account Setting, ua1a and ua1e)
    * Context: The user is logged into their account and on the user account setting page.
    * Actions: Login with example@example.com password; visit the profile page; click “edit” to change the name field/ location field/ privacy field to a new name/ new location/ new privacy setting; click submit. 
    * Expected Outcome: The user is redirected to the profile page, and the new name/ new location/ new privacy setting are displayed in the profile information.

    <br>

11. Profile Picture Edit (Requirement: User Account Setting, ua1d and ua1e)
    * Context: The user is logged into their account and on the user account setting page.
    * Actions: Login with example@example.com password; visit the profile page; Edit the profile picture using the "Edit photo or avatar" feature. Upload a new profile picture; click “Done”.
    * Expected Outcome: The user is redirected to the profile page, and the new user avatar is displayed in the profile information page.

    <br>

12. View Other User's Profile (Requirement: Other User Account, o1a, o1b, and o1c)
    * Context: The user is logged into their account.
    * Actions: Click on another user's profile.
    * Expected Outcome: The basic details and posts of the other user are displayed. The user can explore the profile, follow the user, or request contact information if available.

    <br>

13. Privacy Setting - Private Account (Requirement: Other User Account, 02a)
    * Context: The user visits a profile that has set their account to private.
    * Actions:  Login with example@example.com password; Go to the Diversity page and click on one of the posts showing on the diversity page; And then click “View Owner” at the bottom of the page. 
    * Actions: Access the profile of a user with a private account.
    * Expected Outcome: Only the user's avatar is displayed, and all other information signifies that the author prefers to remain private. The user still has the option to send a follow request to the user.

    <br>

14. Enrich Culture Tab (Requirement: Homepage, h1a and h2a)
    * Context: The user is on the homepage.
    * Actions: Observe the navigation bar.
    * Expected Outcome: The "Enrich Culture" tab in the navigation bar is displayed with semi-bold formatting, indicating the current page.

    <br>

15. Explore Diversity (Requirement: Homepage, h1b and h2b)
    * Context: The user is on the homepage.
    * Actions: Click on a picture under "explore diversity."
    * Expected Outcome: The user is directed to the diversity page.

    <br>

16. Search Bar (Requirements: Homepage, h1c and h2c)
    * Context: The user is on the homepage.
    * Actions: Enter keywords in the search bar and press Enter
    * Expected Outcome: The search functionality works correctly, and relevant information will be displayed based on the entered keywords.

    <br>

17. Error Handling - Search Results not Found (Requirement: Homepage-Error, h3b) 
    * Context: The user searches for keywords that do not appear in the database.
    * Actions: Enter keywords in the search box and click Enter.
    * Expected Outcome: The page displays a "Not Found" message and prompts the user to search again.

    <br>

18. Diversity Page - Navigation Bar (Requirement: d1a, d2a)
    * Context: The user is on the diversity page.
    * Actions: Observe the navigation bar.
    * Expected Outcome: The "Diversity" tab in the navigation bar is displayed with semi-bold formatting, indicating the current page.

    <br>

19. Diversity Page - Recommended Posts (Requirement: d1b, d2b)
    * Context: The user is on the diversity page.
    * Actions: Observe the displayed posts.
    * Expected Outcome: Posts are prioritized and recommended based on the user's chosen location (when disclosed).

    <br>

20. Diversity Page - Read More (Requirement: d1c, d2d)
    * Context: The user is on the diversity page.
    * Actions: Go to the diversity page. Click on one of the posts showing on the diversity page; and click on the "read more" button under the post.
    * Expected Outcome: The user is directed to the “diversity post page”, where they can see the full content of the clicked post.

    <br>

21. Diversity Page - Like Button (Requirement: d1d)
    * Context: The user is on the diversity page before login to the personal account.
    * Actions: Go to the diversity page. Click on one of the posts showing on the diversity page; and click on the like button for a post.
    * Expected Outcome: The user is directed to the sign-up page, indicating that they need to sign up to like posts.
    
    <br>

22. Diversity Page - Like Button (Requirement: d2e)
    * Context: The user is on the diversity page after login to the personal account.
    * Actions:  Go to the diversity page. Click on one of the posts showing on the diversity page; and click on the like button for a post.
    * Expected Outcome: By clicking on the 'like' button, users can show their appreciation for posts. These 'liked' posts are then stored in the user's 'favorite post' section.

    <br>

23. Diversity Page - Go Back to Homepage (Requirement: d1e, d2f)
    * Context: The user is on the diversity page.
    * Actions: Go to the diversity page. Click on the "Enrich Culture" option in the navigation bar.
    * Expected Outcome: The user is redirected to the homepage.

    <br>

24. Diversity Post Page - Post Details (Requirement: dp1b, dp2b)
    * Context: The user is on the diversity post page.
    * Actions: Click on one of the posts showing on the diversity page; observe the post's details.
    * Expected Outcome: The post's image, author details, comments, and hashtags are displayed.

    <br>

25. Diversity Post Page - View Author Profile (Requirement: dp1c)
    * Context: The user is on the diversity post page before login to the personal account.
    * Actions: Click on one of the posts showing on the diversity page; observe the post's details. Click on the author's profile.
    * Expected Outcome: Displaying the user's profile necessitates that they are logged into their account.

    <br>

26. Diversity Post Page - View Author Profile (Requirement: dp2c)
    * Context: The user is on the diversity post page after login to the personal account.
    * Actions: Click on one of the posts showing on the diversity page; observe the post's details. Click on the author's profile.
    * Expected Outcome: The user is directed to the author's profile page, where they can browse through the other posts made by the same individual.

    <br>

27. Diversity Post Page - Go Back to Diversity Page (Requirement: dp1d, dp2d)
    * Context: The user is on the diversity post page.
    * Actions: Click on the "return" button or navigate to a different page.
    * Expected Outcome: When the user clicks 'return', they are redirected to the diversity page. However, if they select other pages from the navigation bar, they will be directed to those respective pages.
    
    <br>

28. Diversity Post Page - Private Author Account (Requirement: dp3a)
    * Context: The author of the post has set their account to private.
    * Action: Click on one of the posts showing on the diversity page; observe the post's details. Click on “View Owner”. Visit the diversity post page of a private account author's post.
    * Expected Outcome: The post's details are displayed, but the system indicates that the author has chosen to remain private, restricting access to other posts by the same author.

    <br>

29. Festival Page - Navigation Bar (Requirement: f1a, f2a)
    * Context: The user is on the festival page.
    * Actions:  Observe the navigation bar.
    * Expected Outcome: The "Festival" tab in the navigation bar is displayed with semi-bold formatting, indicating the current page.

    <br>

30. Festival Page - Filter Tool (Requirement: f1b, f2b)
    * Context: The user is on the festival page.
    * Actions: Go to the festival page. Apply different filters using the checklist filter tool.
    * Expected Outcome: The page instantly updates to display the relevant posts based on the selected filters.

    <br>

31. Festival Page - Like Feature (Requirement: f2c)
    * Context: The user is on the festival page after login to the personal account.
    * Actions: Go to the festival page. Click on the like icon of a post.
    * Expected Outcome: Upon clicking the 'like' icon, the corresponding post will be automatically added to the user's list of favorite posts within their account.

    <br>

32. Festival Page - Like Feature (Requirement: f1c)
    * Context: The user is on the festival page and not logged in.
    * Actions: Go to the festival page. Click on the like icon of a post.
    * Expected Outcome: The user is automatically redirected to the login page, indicating that logging in is required to use the Like feature.

    <br>

33. Festival Page - No Results Found (Requirement: f3a)
    * Context: The user is on the festival page and applies filters that don't match any events.
    * Actions: Go to the festival page. Apply filters with specific criteria of month and/or country.
    * Expected Outcome: The page displays an empty state with a message stating "No results found," indicating that no events match the selected filter criteria.

    <br>

34. Festival Post Page - Post Details (Requirement: fp1b, fp2d)
    * Context: The user is on the festival post page.
    * Actions: Observe the post's details.
    * Expected Outcome: Display the post's image, author details, comments, and hashtags.

    <br>

35. Festival Post Page - View Author Profile before login (Requirement: fp1c)
    * Context: The user is on the festival post page and the user is not logging in.
    * Actions: Click on the author's profile.
    * Expected Outcome: The user will be directed to the sign-in page, where they can use their email and password to log in to their account and after logging in, the user will be redirected back to the festival post page.

    <br>

36. Festival Post Page - View Author Profile after login (Requirement: fp2c)
    * Context: The user is on the festival post page and the user logged in.
    * Actions: Click on the author's profile.
    * Expected Outcome: The user is directed to the author's profile page, where they can browse through the other posts made by the same individual.

    <br>

37. Festival Post Page - Go Back to Festival Page (Requirement: fp1d, fp2d)
    * Context: The user is on the festival post page.
    * Actions: Click on the "return" button or navigate to a different page.
    * Expected Outcome: The user is redirected to the festival page.
    
    <br>

38. Festival Post Page - Private Author Account (Requirement: fp3a)
    * Context: The author of the post has set their account to private.
    * Actions: Visit a post's festival post page that a private account author has created.
    * Expected Outcome: The post's details are displayed, but the system indicates that the author has chosen to remain private, restricting access to other posts by the same author.

    <br>

39. Security - Authentication (Requirement: nf1b)
    * Context: The user is attempting to log in.
    * Actions: Enter a legitimate email address and password.
    * Expected Outcome: The user is successfully authenticated and allowed access to the website.

    <br>

40. Security - Authorization (Before Logging In) (Requirement: nf1ca)
    * Context: The user is not logged in.
    * Actions: Attempt to access other users' information or use features that require data storage.
    * Expected Outcome: The user is unable to access other users' information or use features that require data storage, such as liking a post.

    <br>

41. Security - Authorization (After Logging In) (Requirement: nf1cb)
    * Context: The user is logged in.
    * Actions: Access other users' information and engage with various features of the app, such as liking posts and following other users.
    * Expected Outcome: The user is able to view all posts from other users and engage with various features of the app, including liking posts and following other users.

    <br>

42. Localization - Date (Requirement: nf2a)
    * Context: The user is in a different time zone.
    * Actions: Observe the displayed date.
    * Expected Outcome: The displayed date adjusts based on the user's time zone, indicating that the application considers time differences across various regions and countries.

    <br>

43. Localization - Location (Requirement: nf2b)
    * Context: The user is in a specific location.
    * Actions: Observe the posts and recommendations.
    * Expected Outcome: The system prioritizes posts based on the user's location, suggesting culture-related posts relevant to the user's location.

    <br>

44. Performance - Website Loading Time (Requirement: nf3a)
    * Context: The user accesses the website.
    * Actions: Measure the website loading time.
    * Expected Outcome: The website loads within 3 seconds, ensuring a smooth user experience.