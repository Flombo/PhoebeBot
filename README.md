# Phoebe - Discord bot for artists
Discord bot that let artists retrieve reference images in discord from https://quickposes.com.

- Installation:
  -
  
  - Prerequisite:
    
    - Create your own bot application in the discord developer portal: https://discord.com/developers/applications
    - Copy your bot token & your clientId
    - Clone the repo
    - Add an .env file to the root of the project with the attributes:
        - BOTTOKEN='your token'
        - CLIENT_ID='your clientId'
        - If you want to use the bot backend:
          - PORT='the port for the bot backend'
  - Install all dependencies by your own:
  - Install Node.js
  - Run:
   
        npm install 
        npm run start

  - Using the given Dockerfile with following command:
 
          docker build .
- Features:

  - Pose reference retrieval from https://quickposes.com with further information like the owner of the image, the image url and the width and height
  - Image transformation:
    - Under every reference image there are multiple rows of clickable transformation buttons:
      
      Transformation buttons:
      ![Reference buttons](readmeImages/ReferenceButtons.PNG "Reference buttons")
    
      Original reference:
      ![Original reference image](readmeImages/Original.PNG "Original reference image")
    
    - Rotation (clockwise (:arrows_clockwise: button) and counter-clockwise (:arrows_counterclockwise:)):
      ![Rotated reference image](readmeImages/Rotation.PNG "Rotated reference image")
    - Flip (on y- or x-axis):
      
      Flipped on y-axis (:left_right_arrow: button):
      ![Flipped reference image on y-axis](readmeImages/FlipOnYAxis.PNG "Flipped reference image on y-axis")

      Flipped on x-axis (:arrow_up_down: button):
      ![Flipped reference image on x-axis](readmeImages/FlipOnXAxis.PNG "Flipped reference image on x-axis")

    - Transformation to greyscale image (:older_woman: button):
      ![Reference image turned to greyscale](readmeImages/Greyscale.PNG "Reference image turned to greyscale")
    - Normalization (:grinning: button):
      ![Normalized reference image](readmeImages/Normalize.PNG "Normalized reference image")
    - Median (:heavy_minus_sign: button):
      ![Median reference image](readmeImages/Median.PNG "Median reference image")
    - Sharpening (:razor: button):
      ![Sharpened reference image](readmeImages/Sharpening.PNG "Sharpening reference image")
    - Blur (:dizzy_face: button):
      ![Blured reference image](readmeImages/Blur.PNG "Blur reference image")
    - Negate (:unamused: button):
      ![Negated reference image](readmeImages/Negate.PNG "Negated reference image")

- Available commands:
  - Quickpose commands:
    - /urban => retrieves urban references like skylines
    - /landscapes => retrieves landscape references
    - /face gender(female/male/all) => retrieves face references 
    - /hands gender(female/male/all) => retrieves hand references
    - /animals => retrieves animal references
    - /pose gender(female/male/all) clothing(all/nude & partially nude/clothes & costumes)

- Upcoming features:
    - Reference retrieval via Google image search
    - Reference retrieval via DeviantArt
    - AI generated references
    - Webfrontend


> &copy; 2023 Florian Pfützenreuter
  
