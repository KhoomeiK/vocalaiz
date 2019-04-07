import acoustid
import subprocess
from AudioExtracter import get_audio_file
def fingerprintComparator(word, audio):
     wordList = get_audio_file(word)
     print(wordList)
     if len(wordList) > 0:
         fileWord = wordList[0]
         print(fileWord)
     else:
         return

     procWord = subprocess.Popen(['fpcalc', '-raw', fileWord], stdout=subprocess.PIPE)
     fileWordData = str(procWord.stdout.readlines()[1]).split('=')[1]
     fileWordVals = fileWordData.split(',')

     procAudio = subprocess.Popen(['fpcalc', '-raw', audio], stdout=subprocess.PIPE)
     audioData = str(procAudio.stdout.readlines()[1]).split('=')[1]
     audioVals = audioData.split(',')
     
     for audioVal in audioVals:
         audioVal = int(audioVal.split('\\')[0])
         i = 0
         total = 0
         
         for wordVal in fileWordVals:
             
             if i != len(fileWordVals) - 1:
                 wordVal = int(wordVal.split('\\')[0])
                 diff = int(fileWordVals[i])^int(audioVals[i])
                 total += (diff.bit_length()-1)/32
                 i += 1
             
             else:
                 break
     
     if i != 0:
         avgVal = total/i
         print (1.0 - avgVal)    
         return 1.0 - avgVal

fingerprintComparator("exit", r'C:\Users\anshg\PycharmProjects\matadorhacks\vocalaiz\backend\audio\mouse001.mp3')