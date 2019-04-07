from bs4 import BeautifulSoup
import requests
from pydub import AudioSegment
AudioSegment.converter = r"C:\\FFmpeg\\bin\\ffmeg.exe"
AudioSegment.ffmpeg = r"C:\\FFmpeg\\bin\\ffmeg.exe"

def get_audio_file(word):
    locations = []
    result = requests.get("https://www.merriam-webster.com/dictionary/" + word).text
    soup = BeautifulSoup(result, 'lxml')
    audio_locations = soup.find_all('a', class_="play-pron hw-play-pron")
    for location_item in audio_locations:
        location = location_item["data-file"]
        audio_content = requests.get("https://media.merriam-webster.com/audio/prons/en/us/mp3/" + location[0] + "/" + location + ".mp3").content
        path = "./audio/" + location + ".mp3"
        file = open(path, "wb")
        file.write(audio_content)
        file.close()
        temp = AudioSegment.empty()
        temp += AudioSegment.from_mp3("./audio/tree0001.mp3")
        temp += AudioSegment.silent()
        locations.append(path)
    return locations

get_audio_file("tree")





