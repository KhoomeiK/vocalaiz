from bs4 import BeautifulSoup
import requests

def get_audio_file(word):
    audio_results = []
    result = requests.get("https://www.merriam-webster.com/dictionary/" + word).text
    soup = BeautifulSoup(result, 'lxml')
    audio_locations = soup.find_all('a', class_="play-pron hw-play-pron")
    for location_item in audio_locations:
        location = location_item["data-file"]
        audio_result = requests.get("https://media.merriam-webster.com/audio/prons/en/us/mp3/" + location[0] + "/" + location + ".mp3").content
        audio_results.append(audio_result)

    return audio_results

print(get_audio_file("mouse"))


