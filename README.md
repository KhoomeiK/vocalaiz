# vocalaiz

Mobile app using machine learning to help language learners correct their accent

## Plan

- download multiple audiobooks
- run audiobooks through speech to text algorithm that gives time labels for each word
- train individual ML models on all the recordings of each word
- postgres table with [ word ] | [ path to model for word ]

## Notes (Miguel)

- Do we even need a postgres table for word -> path to model? Can't we just create a directory structure like `/models/{word}/model`?
- Instead of training ML, we can use a diff of the audio and then compare the diffs? (Similar to how [Shazam](<https://en.wikipedia.org/wiki/Shazam_(application)>) [works](http://coding-geek.com/how-shazam-works/))
- Prelim can be audio fingerprinting
- Could use the Call API to record outside of the app

## How works future

- Person says word
- App converts word to text and makes POST to server with word and its audio
- Server finds word in database and loads ML model for it
- Runs audio from POST through ML model
- Respond with whether pronounced good or bad

## MVP no stream

- App records file
- App sends file to server
- Server downloads file and sends to gcloud api
- Server gets timestamps for each word and splices the file into word files named after STT responses
- Server passes path to word file to fingerprinter
- Fingerprinter fingeprints word file and official word file then diffs
- Server responds JSON with structure {word: diffVal, word2: diffVal2}

## Links

- [http://slazebni.cs.illinois.edu/spring17/lec26_audio.pdf](http://slazebni.cs.illinois.edu/spring17/lec26_audio.pdf)
- [https://www.analyticsvidhya.com/blog/2017/08/audio-voice-processing-deep-learning/](https://www.analyticsvidhya.com/blog/2017/08/audio-voice-processing-deep-learning/)
