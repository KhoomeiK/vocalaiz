async function main() {
  // Imports the Google Cloud client library
  const speech = require('@google-cloud/speech');
  const fs = require('fs');

  // Creates a client
  const client = new speech.SpeechClient();

  // The name of the audio file to transcribe
  const fileName = 'test.wav';

  // Reads a local audio file and converts it to base64
  const file = fs.readFileSync(fileName);
  const audioBytes = file.toString('base64');

  // The audio file's encoding, sample rate in hertz, and BCP-47 language code
  const audio = {
    content: audioBytes,
  };
  const config = {
    encoding: 'LINEAR16',
    sampleRateHertz: 44100,
    languageCode: 'en-US',
    enableWordTimeOffsets: true
  };
  const request = {
    audio: audio,
    config: config,
  };

  // Detects speech in the audio file
  const [response] = await client.recognize(request);
  let words = response.results[0].alternatives[0].words
  for (word of words) {
    startNans = parseInt(word.startTime.seconds) + word.startTime.nanos/1000000000
    endNans = parseInt(word.endTime.seconds) + word.endTime.nanos/1000000000
    console.log(`${word.word}: ${startNans} - ${endNans}`)
  }
}
main().catch(console.error);
