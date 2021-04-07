# Whatsapp-Bot

- This is a Bot that sends messages automatically to another person in Whatsapp.

## Technologies:
- This was made in NodeJS with the Puppeteer library.

## How to use it:
- After cloning the project, go to the terminal and write: npm install puppeteer; to install the puppeteer library

- Then, change the params of the sendMessage function. These are the params that you have to put: 

    1° = Contact name. The contact name must be at least on the five last contacts that you talked with

    2° = Type of message. The possibilities are:

        * normalMessage, message defined at the fourth param;

        * randomFlood, message with random characters

        * repeater, under development ...

    3° = Amount of messages that you want to send

    4° = The Message(not required when using the randomFlood mode)