import acoustid
from AudioExtracter import get_audio_file
import subprocess

def fingerprintComparator(word, audio):
     
     if len(wordList):   
         wordList = get_audio_file(word)
         fileWord = get_audio_file(word)[0]
     else:
         return

     procWord = subprocess.Popen(['fpcalc', '-raw', fileWord],stdout=subprocess.PIPE)
     fileWordData = str(procWord.stdout.readlines()[1]).split('=')[1]
     fileWordVals = fileWordData.split(',')

     procAudio = subprocess.Popen(['fpcalc', '-raw', audio],stdout=subprocess.PIPE)
     audioData = str(procAudio.stdout.readlines()[1]).split('=')[1]
     audioVals = audioData.split(',')
     
     for audioVal in audioVals:
         audioVal = int(audioVal.split('\\')[0])
         i = 0
         total  = 0
         
         for wordVal in fileWordVals:
             
             if i!= len(fileWordVals) - 1:
                 wordVal = int(wordVal.split('\\')[0])
                 diff = int(fileWordVals[i])^int(audioVals[i])
                 total += (diff.bit_length()-1)/32
                 i+=1
             
             else:
                 break
     
     if i != 0:
         avgVal = total/i
         print (1.0 - avgVal)    
         return 1.0 - avgVal