# HCI team report
## DP3 - Lofi Prototype
---

## VISUAL TRAVELER
* 20140762 YunCheol Ha
* 20186651 Doyeon Choi
* 20214902 Xiangchi Song
* 20214903 Letian Zhang

---
### Point of View (POV)
* Who: Scenery photographer
* What they need: They need to get inspired, want to share the great scene, get the real information of a good place.
* Because: It’s hard to find the real look of that place, the information is sporadic, so organizing the information is hard.
---
### Tasks
* choose one place, search the pictures by the time and see the related information of the picture, collect the information about that.
> This is the main need and solution of our application. When we serve the information location with a map so that users can recognize the information at one glance, it makes users easy to find location, time, and other things. And this is for photographers, so we want to show more related information such as the pictures taken at the same place, or taken at the same way. It would be helpful for those who want to get inspired.
* Upload photos with copyright. providing the photo related information (equipment, shutter.)
> Copyright is the most important aspect of photographers, and in the existing SNS such as instagram or facebook don’t have slots for detailed information about the camera.
* go to see some photos in the recommandation in the home page, leave the feedback about the photo and thumb up the photo, also users can organize the favorited pictures.
> We made this function to let users organize the pictures and information easily, and share the feeling about the pictures with photographers.
---
### Prototype
#### Tools we used : Figma
> Reason: The frame function of this software is powerful, no matter when designing graphics and structure, or when designing the interaction between various pages, the connection function makes this interaction intuitive and convenient. Teamwork is easy
> Didn’t work well: One problem is that when using figma for user testing, he will prompt for interactive parts, which is not friendly to usability testing.
#### Live Prototype Link: https://www.figma.com/proto/a05wV8KFGcRjNBbjnWP3Ed/Visual-Traveler?node-id=0%3A1&scaling=min-zoom&page-id=0%3A1
#### Design Choice:  Why we shouldn’t implement this
* Zoom up the map and drag the map, because it’s hard to implement it in the figma. Also, it is not related to our core task
* Set location information by moving the pin on the map like Kakao T-taxi or Uber. In our prototype, users have to write down the location information by themselves but we actually want to make it in this way. But, in Figma, a reactable map function is hard to implement.
* Search pictures by location, city name, or place type(search by “sea”, “mountain”, or “busan”) because in figma there is no reactable function.
* Writing specific comments about pictures. In lo-fi prototype, the comment was set like “blablabla”, because the content of the comment isn’t so important. 
#### Design Choice: Why we should implement this
* Connecting location with pictures - This is the most important part of our main functions. We want to provide it at one glance like airbnb.
* Upload post with detail descriptions
* Add “like-list” when the user likes that photo.
* Provide equipment and photography-related information such as aperture size-this is so that other photographers can learn more about the shooting skills of photos and gain more understanding and inspiration.


#### Prototype



![Slide1](https://github.com/yibre/KAIST-introduction-to-human-and-computer-HW-2021-Spring/blob/main/images/0504_1.png?raw=true)
> [slide 1st] This is the main page of our prototype.We can see that there are only a few simple elements on the homepage. The first is the logo at the top. On any page, the logo can be returned to the homepage by clicking. There are two buttons next to it to view your account and upload pictures, and then The map in the middle, which is the channel to the pin function. In the back, this map will be a more flexible map. At the bottom are some photo recommendations. Users can click to enter the photo details page.


![Slide2](https://github.com/yibre/KAIST-introduction-to-human-and-computer-HW-2021-Spring/blob/main/images/0504_2.png?raw=true)
> [slide 2nd] This is the screen right after the user put their mouse over the map. The map expands, users can be aware of the location where the photos are taken intuitively.The first thing that catches the eye is the big map in the middle. Although there is no hint, most of the users we tested will try to interact with it. This is our first feature. We can see that there will be some places marked here, which means that a certain popular photo has been taken in this place. For how to determine whether the photo is popular, we will set a threshold, but how much is it? Also needs to be determined.

![Slide3](https://github.com/yibre/KAIST-introduction-to-human-and-computer-HW-2021-Spring/blob/main/images/0504_3.PNG?raw=true)
> [slide 3rd] When you hover through this place, he will show the most liked photos in this place.

![Slide4](https://github.com/yibre/KAIST-introduction-to-human-and-computer-HW-2021-Spring/blob/main/images/0504_4.PNG?raw=true)
> [slide 4th].When you click on this place, you can see that all the photos taken in this place will be displayed on the left, but the default is sorted by popularity.but you can easily change the order of the photo easily by clicking the button on the top of the left part.
![Slide5](https://github.com/yibre/KAIST-introduction-to-human-and-computer-HW-2021-Spring/blob/main/images/0504_5.PNG?raw=true)
> [slide 5th] Also, users can choose to align the photos by hits or latest order.

![Slide6](https://github.com/yibre/KAIST-introduction-to-human-and-computer-HW-2021-Spring/blob/main/images/0504_6.PNG?raw=true)
>  [slide 6th] user can see informations of photo

![Slide7](https://github.com/yibre/KAIST-introduction-to-human-and-computer-HW-2021-Spring/blob/main/images/0504_7.PNG?raw=true)
> [slide 7th] user can get more information of photo by clicking camera icon




![Slide8](https://github.com/yibre/KAIST-introduction-to-human-and-computer-HW-2021-Spring/blob/main/images/0504_8.PNG?raw=true)
> [slide 8th] by pressing collecting button, user can store the information



![Slide9](https://github.com/yibre/KAIST-introduction-to-human-and-computer-HW-2021-Spring/blob/main/images/0504_9.PNG?raw=true)
>[slide 9th] user can give feedback to photographer by clicking heart, or click speech bubble to have 1:1 comment



![Slide10](https://github.com/yibre/KAIST-introduction-to-human-and-computer-HW-2021-Spring/blob/main/images/0504_10.PNG?raw=true)
> [slide 10th] In this section, we can see more photos taken by this device and recommend them to users for viewing. Here we can also choose to upload photos and return to our account, or return to pictures and corresponding cameras information.

![Slide11](https://github.com/yibre/KAIST-introduction-to-human-and-computer-HW-2021-Spring/blob/main/images/0504_11.PNG?raw=true)
> [slide 11th] Here, we provide a link to the Amazon shopping network of the camera that took this photo and more professional information about this device for consumers and users to refer to and purchase, so here we not only provide photos and positioning, we also provide the equipment recommendation and purchase method.



![Slide12](https://github.com/yibre/KAIST-introduction-to-human-and-computer-HW-2021-Spring/blob/main/images/0504_12.PNG?raw=true)
> [slide 12th] Here we can see the photos that have been marked as "likes and comments", and can view the photo templates that we like.

![Slide13](https://github.com/yibre/KAIST-introduction-to-human-and-computer-HW-2021-Spring/blob/main/images/0504_13.PNG?raw=true)
> [slide 13th] We will add the function of "one-click use of the aperture and filter of the template" so that users can make photos with the same style as they like.


![Slide14](https://github.com/yibre/KAIST-introduction-to-human-and-computer-HW-2021-Spring/blob/main/images/0504_14.PNG?raw=true)
> [slide 14th] Here we show the process of uploading photos. Select a photo then add camera setting information, then click Upload to upload photos and click Cancel to back to the upload page.


![Slide15](https://github.com/yibre/KAIST-introduction-to-human-and-computer-HW-2021-Spring/blob/main/images/0504_15.PNG?raw=true)
> [slide 15th] Here we show the process of submitting photos. After selecting the photo and adding relevant information, come to this page and continue to add the location, time, copyright and supplementary information that the photographer wishes to add. Click Submit then officially upload.

#### Instructions to test UI
* Task 1
1. What do you do if you want to see certain pictures taken in one city?
2. What do you do if you want further information about the post?
3. What do you do if you want to save the information about this post?
* Task2
1. What do you do if you want to upload photo you have? 
* Task3
1. What do you do if you want to give and cancel thumb up?
2. What do you do if you want to give comment about photo?

 
 
___
### Observations
 

#### Participant Information
1. P1
- loves to take scenery pictures
- has 2,000 followers on his instagram
2. P2
- 500px contracted professional photographer
- Provided 7 beautiful pictures for 500px
3. P3
- liked to take a picture(not now because health problem)
- He can’t spend much time wandering to find a place.
4. P4
- Visual China contracted professional photographer
- Two years of contributing experience
#### Usability Issues
#### Order of criticality
* HIGH
1. User wants to check the comment they left. Because in our lo-fi prototype, there is any screen about checking the comments they leave. So users asked us how to see their comments. (P2)
2. The user hopes that the system recommends not only similar scenes, but also specifically selected elements in the picture. For example, users want to see the similar scene, or pictures with similar lenz settings. (P2)
3. Address information should be more specific to a small place, in the lo-fi prototype, the users want to see the pictures of Busan, Haeundae, not just Busan. (P3)

* Medium
4. User wants to edit his comment and wants to leave more than 1 comment. When a user has left more than one comment, and the user wants to go back to view or modify his own comment, more display and storage methods are needed.(P1, P3)
5. User is hard to find the button to open the information that related to the equipment When using this interface for the first time, the user can only find the icon but does not know what function it is, so it will be easier to find when the user explores by himself, but when it is task-driven, it is difficult to associate the icon with this function. together.(P4)
6. User tried to drag to change the order of the photo list. (after picking one place) the way that shows the picture taken in that place looks like a slot with some staff in it. The user tried to drag the staff to change the place of the picture.(P4)


* Low
7. User tried to zoom up the map and drag it.(P1, P2) This is a common operation habit of users. They will drag maps and icons unconsciously. This problem can be solved by users gradually adapting to the operation interface.
8. User tried to zoom up the photo(he wanted a full screen of photo) (P3) Since most social software can zoom in and zoom out the pictures, our test users also tried to do this. This part of the problem is usability and does not affect system functions, so we put it at the lowest priority for modification.
9. User tried to click the main title to come back to the main menu, not the button. (P1) Since most of the main title provide the direct link to the main page, so by default, they will choose the title rather than the back button.
10. User wants to know the price of equipment. There is information about what camera equipment has been used, but we missed the point that users may be curious about the price of them. (P3)
11. In the uploading process, the user accidently go to ‘from google drive’(his purpose was ‘from the computer’), then he got stuck because there is no direct way to switch it. (P3)

#### Order of theme or tasks
1. User want more information about photo 
-  about equipments(#10), location(#3), and detail information(#6)
2. User want flexibility of contents 
- flexibility of list order (#6), map(#7), photos(#8), main title(#9), and while uploading(#11)
3. User need better comment interface 
- showing stored comment (#1), changing comment (#4)
4. User need diversity of the recommendations - Observation #2

#### Plan to improve
* Add more information and location index in the Main Page
* Show the comment the user left before they delete
* Connect every titles to go back the main page
* Give flexibility to photos and maps
* Change the order of “heart” and “see detail information” below the pictures according to the natural view order.
* The recommendation section can give more subdivision tags, not just similar scenarios.
* We will add the function of "one-click use of the aperture and filter of the template" so that users can make photos with the same style as they like.


---
### Class Feedback
* About UI
> We are going to limit the information in one screen, to reduce the amount of text.Use a more intuitive way of delivering information than text.
> Camera icon is much more intuitive to learn so that’s why we put the icon, and we think users might try to learn it.I think his location is next to the like and comment icons. These two are next to the most commonly used functions, so they can be easily discovered by people, even though they don’t know what they mean when they first see it. When she tried it for the first time, the following things became very simple. Since people would explore what they can do.

* About recruiting our users
> We're gonna post an advertisement about our application, especially famous SNS such as instagram or youtube and pinterests.

* Upload detailed informations
> Yes, this does take some time. This is a good idea, and we also think that auto-completion would be better. Through our search, we can read relevant information in the attributes of the photo file, such as location and time; at the same time, there is also some shooting-related information, such as aperture and focal length. We can give some frequently used options, to make users easy to write down the detailed information. Of course, detailed information is an optional part. Users don’t have to write it when uploading photos.

* About recommandations : Could be interesting to be able to browse through photos by changing the different settings of the camera (e.g., what if I increase the aperture, how would the photo look like)
> that’s really interesting, so in this way we will have different templates of the same picture. In the hi-fi prototype, we will consider doing it.

* I think “see photo->find location” is better rather than “find location -> see photo”. See photos with category or hashtag (such as #sunrise, #snow), and then tell where this picture is taken.
> Yes, it is. And we provide “see photo->find location” in the daily recommendation picture. But there will be another situation like you heard somewhere is beautiful and you want to check how beautiful it is, in that way  “find location -> see photo” will be helpful. Moreover , yep, the hashtag is really a good choice, and we will implement in the later design.

* How can users know photoshop effects
> Photoshop focuses on special effects, and we focus on the settings of the camera itself. The photograph changes some things like colors, but the camera focuses on the use of the lens, the adjustment of the focal length, and the setting of the angle of view. but that the settings of photoshop and the camera itself are two concepts. Of course, we didn’t focus much about photoshop effect, but users might ask it by comments.

