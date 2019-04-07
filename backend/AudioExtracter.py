from bs4 import BeautifulSoup
import requests
import os
from pydub import AudioSegment
from glob import glob
import ctypes, sys

AudioSegment.converter = r"C:\\Users\\AK\Desktop\\ffmpeg-20190407-8607e29-win64-static\\bin"

def update_audio(location):
    temp = AudioSegment.empty()
    temp += AudioSegment.from_mp3('audio\\' + location + '.mp3')
    temp += AudioSegment.silent(3800)
    print(type(temp))
    temp.export('audio\\' + location + '.mp3', format="mp3")


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
        update_audio(location)
        locations.append(location)
    return locations


print(get_audio_file("dog")[0])




