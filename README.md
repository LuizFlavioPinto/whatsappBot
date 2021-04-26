# Whatsapp-Bot

- This is a Bot that sends messages automatically to another person or group in Whatsapp.

## Technologies:
- This was made in NodeJS with the Puppeteer library.

## How to use it:
- After cloning the project, go to the terminal and write: npm install puppeteer; to install the puppeteer library

- Then, change the params on config.json. These are the params that you have to put: 

    1° = Contact name. The contact name must be at least on the six last contacts that you talked with

    2° = Type of message. The possibilities are:

        * Normal Message, message defined at the fourth param;

        * Random Flood, message with random characters

        * Repeater, takes de last sent message of the person and sends it again 

    3° = Amount of messages that you want to send

    4° = The Message(just required when using the Normal Message mode)

- Then, execute the program and have fun pissing your friends off