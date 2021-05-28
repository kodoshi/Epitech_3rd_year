# Call4Papers
## Greed, Carelessness & Telemetry - The Holy Trinity of Privacy Breaches

In this short description I want to summarize the privacy threat that most mobile apps pose to their user, whether it’s intended or not by their creators. A recent study of 110 leading Android & iOS apps found that 73 percent of the Android apps shared your email address with third parties, & 47 percent of the iOS apps shared your location, without consent of course. Some medical apps share your searches, so good luck if you've searched for hepatitis, cancer or any other explicit term.


You are probably running several apps that share your name, email address, location & other personal details with three or more third parties, & you have no chance of stopping them, unless you remove them completely. And by then, it's too late. Even if you think your chosen app provider has high ethics & would NEVER breach your privacy, it is very likely that this app is constantly pinging a central server, not just to receive live updates, but also to share telemetry, including geolocation, phone contacts, device & connection information among other data.


Continuing with the supposition that the app provider is ethical & that this metadata & telemetry is anonymized & encrypted before being sent, this practice still leaves the vulnerability of being packet sniffed, especially when connecting to public networks. Telemetry in itself isn’t evil, but usually its implementation is.


A prime example would be an individual that is not privacy-oriented, going out to a bar for some drinks with his friends, he connects to the local wifi, not knowing that his Facebook Messenger & Whatsapp is leaking all kinds of sensitive metadata over an insecure network while constantly pinging a server for an update.


#### TALK REFERENCES

A suggested solution & the subject going forward in this Talk/Workshop would be how to circumvent the flaws expressed in the abstract. It would include temporary access rights revocation & metadata spoofing/randomizing.
The Talk would include slides explaining simple methods achieving mitigation.