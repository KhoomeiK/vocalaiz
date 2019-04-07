from bs4 import BeautifulSoup
import requests


def get_audio_file(word):
    locations = []
    result = requests.get("https://www.merriam-webster.com/dictionary/" + word).text
    soup = BeautifulSoup(result, 'lxml')
    audio_locations = soup.find_all('a', class_="play-pron hw-play-pron")
    for location_item in audio_locations:
        location = location_item["data-file"]
        audio_content = requests.get("https://media.merriam-webster.com/audio/prons/en/us/mp3/" + location[0] + "/" + location + ".mp3").content
        file = open("./audio/" + location + ".mp3", "wb")
        file.write(audio_content)
        file.close()
        locations.append("./audio/" + location + ".mp3")
    return locations