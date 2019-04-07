# from pydub import AudioSegment
# t1 = 20000 #Works in milliseconds
# t2 = 24000
# newAudio = AudioSegment.from_wav(r"C:\\Users\\AK\\Documents\\MatadorHacks\\vocalaiz\\backend\\audio\\LongWord.wav")
# newAudio = newAudio[t1:t2]
# newAudio.export('newSong.wav', format="wav") #Exports to a wav file in the current path.
from pydub import AudioSegment
from pydub.utils import make_chunks

myaudio = AudioSegment.from_file("C:\\Users\\AK\\Documents\\MatadorHacks\\vocalaiz\\backend\\audio\\LongWord.wav" , "wav") 
chunk_length_ms = 1000 # pydub calculates in millisec
chunks = make_chunks(myaudio, chunk_length_ms) #Make chunks of one sec

#Export all of the individual chunks as wav files

for i, chunk in enumerate(chunks):
    chunk_name = "chunk{0}.wav".format(i)
    print ("exporting", chunk_name)
    chunk.export(chunk_name, format="wav")