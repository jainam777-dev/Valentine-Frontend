import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./PickupLine.css";
const pickupLines = [
  "Are you a magician? Because whenever I look at you, everyone else disappears.",
  "Is your name Google? Because you have everything I’ve been searching for.",
  "Are you French? Because Eiffel for you.",
  "Are you a parking ticket? Because you’ve got ‘FINE’ written all over you.",
  "Do you have a name, or can I call you mine?",
  "Are you Wi-Fi? Because I'm really feeling a connection.",
  "Can you lend me a kiss? I promise I’ll give it back.",
  "Do you believe in love at first sight, or should I walk by again?",
  "Are you a time traveler? Because I can see you in my future.",
  "If looks could kill, you’d definitely be a weapon of mass destruction.",
  "Are you a bank loan? Because you have my interest.",
  "Is your dad a baker? Because you’re a cutie pie!",
  "You must be a camera because every time I look at you, I smile.",
  "If beauty were time, you’d be an eternity.",
  "Do you have a Band-Aid? Because I just scraped my knee falling for you.",
  "Are you an alien? Because you just abducted my heart.",
  "Are you a campfire? Because you’re hot and I want s’more.",
  "Do you like Star Wars? Because Yoda one for me.",
  "Are you a dictionary? Because you add meaning to my life.",
  "Is your name Chapstick? Because you’re da balm!",
  "Do you work at Starbucks? Because I like you a latte.",
  "Are you an electrician? Because you’re lighting up my life.",
  "Are you a snowstorm? Because you just made my heart freeze.",
  "Can I follow you home? Because my parents always told me to follow my dreams.",
  "Are you a volcano? Because I lava you.",
  "Are you made of copper and tellurium? Because you’re Cu-Te.",
  "Do you like raisins? How do you feel about a date?",
  "If you were a vegetable, you'd be a cute-cumber!",
  "Are you an angel? Because heaven is missing one.",
  "I must be a snowflake because I’ve fallen for you.",
  "You must be tired because you’ve been running through my mind all day.",
  "Do you have a map? I keep getting lost in your eyes.",
  "Are we at the airport? Because my heart is taking off.",
  "Are you an artist? Because you just painted a smile on my face.",
  "Are you a phone charger? Because without you, I’d die.",
  "Do you have a sunburn, or are you always this hot?",
  "Are you a cat? Because I'm feline a connection between us.",
  "Are you a cloud? Because you make my day brighter.",
  "Do you play soccer? Because you’re a keeper.",
  "Are you a black hole? Because you just sucked me in.",
  "Are you a song? Because I can’t get you out of my head.",
  "Are you a Netflix show? Because I could binge-watch you all day.",
  "Do you like the ocean? Because we should tide the knot.",
  "Are you a diamond? Because you’re flawless.",
  "Are you a secret agent? Because you just stole my heart.",
  "Are you a chef? Because you just seasoned my heart with love.",
  "Are you a superhero? Because you just saved my day.",
  "Do you work at NASA? Because your beauty is out of this world.",
  "Are you a fortune teller? Because you just predicted my happiness.",
  "Are you a roller coaster? Because you just took my breath away.",
  "Are you a mirror? Because I see myself in you.",
  "Are you made of chocolate? Because you're sweet and irresistible.",
  "Do you have a twin? Because you must be an angel’s copy.",
  "Is your heart a WiFi signal? Because I'm feeling the connection.",
  "Are you a light bulb? Because you just brightened my day.",
  "Are you a shooting star? Because my wish just came true.",
  "Are you an astronaut? Because my world revolves around you.",
  "Are you an Instagram filter? Because you make everything look better.",
  "Are you a jigsaw puzzle? Because I think we fit together perfectly.",
  "Are you a sunrise? Because you just made my day.",
  "Are you gravity? Because you’re pulling me in.",
  "Are you a pilot? Because you just took my heart to new heights.",
  "Are you a dream? Because I never want to wake up from you.",
  "Are you an umbrella? Because you just saved me from the rain.",
  "Are you a butterfly? Because you make my heart flutter.",
  "Are you a rainbow? Because you just colored my world.",
  "Are you a time machine? Because I want to spend forever with you.",
  "Are you a museum? Because I just lost myself in your beauty.",
  "Are you a pearl? Because you’re a rare find.",
  "Are you a treasure map? Because I just found my X.",
  "Are you a compass? Because you always point me in the right direction.",
  "Are you a genie? Because you just granted my heart’s wish.",
  "Are you a key? Because you just unlocked my heart.",
  "Are you a sunflower? Because you brighten my world.",
  "Are you a shadow? Because I want you by my side forever.",
  "Are you a rose? Because you just bloomed in my heart.",
  "Are you a shooting star? Because I just made a wish for you.",
  "Are you an ice cube? Because you just melted my heart.",
  "Are you a notebook? Because I want to write our love story.",
  "Are you a melody? Because I can’t stop humming about you.",
  "Are you a coffee? Because you keep me awake thinking about you.",
  "Are you an anchor? Because you keep me grounded.",
  "Are you a supernova? Because you just blew my mind.",
  "Are you a Ferris wheel? Because you take my love to new heights.",
  "Are you a GPS? Because you just led me to happiness.",
  "Are you a spaceship? Because my love for you is out of this world.",
  "Are you a puzzle piece? Because I think you complete me.",
  "Are you the moon? Because I’m drawn to you every night.",
  "Are you a spark? Because you just ignited my heart.",
  "Are you a pencil? Because I want to sketch my future with you.",
  "Are you a lighthouse? Because you just guided me to love.",
  "Are you made of beryllium, gold, and titanium? You must be because you are BeAuTi-ful.",
  "Baby, if you were a fruit you’d be a fineapple.",
  "Let’s convert our potential energy into kinetic energy.",
  "If you were a browser, you’d be called FireFoxy.",
  "Do you believe in love at first sight or should I pass by you again?",
  "I may not be Dairy Queen, baby, but I’ll treat you right!",
  "Excuse me? Do you work at Little Caesars? Because you’re hot and I’m ready.",
  "Are you the square root of -1? Because you can’t be real.",
  "You’re more special than relativity.",
  "My love for you is like dividing by zero – it cannot be defined.",
  "What do you and your shower have in common? You both get wet when I turn you on.",
  "If I could rearrange the alphabet, I’d put 'U' and 'I' together.",
  "I need more than 140 characters to tell you how beautiful you are.",
  "I’m no photographer, but I can picture us together.",
  "Well, here I am! What are your other two wishes?",
  "Hi, I’m writing a phone book, can I have your number?",
  "I didn’t know angels could fly so low.",
  "I’ll be Burger King and you be McDonald’s. I’ll have it my way, and you’ll be lovin’ it.",
  "You give me Epsilon, I give you Delta. Together, we find limits.",
  "Did you know that your body is made 70% of water? And now I’m thirsty.",
  "Did you get those yoga pants on sale? Because at my house they’re 100% off.",
  "If I freeze, it’s not a computer virus. I was just stunned by your beauty.",
  "Every function without you will always be void of love.",
  "Does your skin feel burned? Because I think you must have just fallen down from heaven, and re-entry gave you a tan.",
  "You have the nicest syntax I’ve ever seen.",
  "Roses are red, violets are blue. Love never crossed my mind, until I came across you.",
  "Are you a singularity? Not only are you attractive, but the closer I get to you, the faster time seems to slip by.",
  "What did the chocolate syrup say to the ice cream? 'I’m sweet on you!'",
  "Your smile must be a black hole, nothing can escape its pull.",
  "You’re so beautiful you made me forget my pick-up line.",
  "Your name must be Coca-Cola, because you’re so-da-licious.",
  "Are you a computer whiz? It seems you know how to turn my software to hardware.",
  "Wanna measure the coefficient of static friction between us?",
  "How can you be so sad when you are so beautiful?",
  "You must be a magnetic monopole because all I get from you is attraction.",
  "If I was the Grinch, I wouldn’t steal Christmas. I’d steal you.",
  "Do you love me because I am beautiful or am I beautiful because you love me?",
  "It’s girls like you that cause global warming!",
  "Are you made of copper and tellurium? Because you’re CuTe.",
  "You’re so beautiful that last night you made me forget my pickup line.",
  "I’m attracted to you so strongly, scientists will have to develop a fifth fundamental force.",
  "Hey baby, if I supply the voltage and you supply some resistance, imagine the current we can make together.",
  "Don’t stop! I don’t usually get to see beauty in motion.",
  "Take an ice cube to the bar, smash it and say: 'Now that I’ve broken the ice, will you sleep with me?'",
  "Are you the Energizer bunny? Because you just keep going and going through my mind.",
  "Can I have your picture so I can show Santa what I want for Christmas?",
  "Your clothes would look better accelerating towards the floor at 9.8 m/s².",
  "Wanna get together and test the spring potential of my mattress?",
  "We must be subatomic particles, because I feel strong force between us.",
  "I’m new in town. Could you give me directions to your apartment?",
  "I want you more than a Häagen-Dazs on a hot summer day.",
  "Are you a keyboard? Because you’re my type!",
  "You must be from Pearl Harbor because baby, you’re the bomb.",
  "According to the second law of thermodynamics, you’re supposed to share your hotness with me.",
  "I’m sorry I wasn’t part of your past, can I make it up by being in your future?",
  "You’re sweeter than 3.14.",
  "Forget hydrogen, you’re my number one element.",
  "If I had a star for every time you brightened my day, I’d have a galaxy in my hand.",
  "Excuse me miss, can I have the time? I’d check my watch but I can’t take my eyes off you.",
];


const ValentinePickupline = () => {
  const [line, setLine] = useState("");
  const [copied, setCopied] = useState(false);

  const getPickupLine = () => {
    const randomLine =
      pickupLines[Math.floor(Math.random() * pickupLines.length)];
    setLine(randomLine);
    setCopied(false); // Reset copied status when new line is generated
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(line);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

  return (
    <div style={{ width: "100svw" }}>
      <img src="/right.png" className="rightImg" />
      <img src="/left.png" className="leftImg" />

      <div className="container text-center mt-4 mybox">
        <h1 className="myline">Pickup Line Generator 💕</h1>
        <button className="mt-3" onClick={getPickupLine}>
          Generate Pickup Line
        </button>
        <button className="companyButton ms-2" onClick={()=>{
          window.open("http://www.avinyakriti.in","_blank");
        }} ><img src="/company.png"/></button>
        {line && (
          <div className="mt-3 p-3 border rounded bg-light position-relative">
            <p>{line}</p>
            <button
              className="btn btn-outline-secondary btn-sm mt-2"
              onClick={copyToClipboard}
            >
              {copied ? "Copied! ✅" : "Copy"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ValentinePickupline;
