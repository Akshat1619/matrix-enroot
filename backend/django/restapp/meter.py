import pyaudio
import wave
import numpy as np
import requests
from .firebase import firebase


class Audio:

    def __init__(self, voice):
        self.voice = voice

    def sound_meter(self):

        freq = 0.0
        FORMAT = pyaudio.paInt16
        CHANNELS = 2
        RATE = 44100
        CHUNK = 1024
        RECORD_SECONDS = 10
        WAVE_OUTPUT_FILENAME = "file.wav"
        chunk = 2048
        counter = 0

        audio = pyaudio.PyAudio()

        firebaseObject = firebase.FirebaseApplication('https://pukaar-9478a.firebaseio.com/', None)

        # start Recording
        stream = audio.open(format=FORMAT, channels=CHANNELS,
                            rate=RATE, input=True,
                            frames_per_buffer=CHUNK)
        print("recording...")
        frames = []

        for i in range(0, int(RATE / CHUNK * RECORD_SECONDS)):
            data = stream.read(CHUNK)
            frames.append(data)
        print("finished recording")

        # stop Recording
        stream.stop_stream()
        stream.close()
        audio.terminate()

        waveFile = wave.open(WAVE_OUTPUT_FILENAME, 'wb')
        waveFile.setnchannels(CHANNELS)
        waveFile.setsampwidth(audio.get_sample_size(FORMAT))
        waveFile.setframerate(RATE)
        waveFile.writeframes(b''.join(frames))
        waveFile.close()



        # Decibels recognizer


        # open up a wave
        wf = wave.open('bird.wav', 'rb')
        swidth = wf.getsampwidth()
        RATE = wf.getframerate()
        window = np.blackman(chunk)

        # open stream
        p = pyaudio.PyAudio()
        stream = p.open(format =
                        p.get_format_from_width(wf.getsampwidth()),
                        channels = wf.getnchannels(),
                        rate = RATE,
                        output = True)

        # read some data
        data = wf.readframes(chunk)

        # play stream and find the frequency of each chunk
        while len(data) == chunk*swidth:
            # unpack the data and times by the hamming window
            indata = np.array(wave.struct.unpack("%dh"%(len(data)/swidth), data))*window
            # Take the fft and square each value
            fftData=abs(np.fft.rfft(indata))**2
            # find the maximum
            which = fftData[1:].argmax() + 1
            # use quadratic interpolation around the max
            if which != len(fftData)-1:
                y0, y1, y2 = np.log(fftData[which-1:which+2:])
                x1 = (y2 - y0) * .5 / (2 * y1 - y2 - y0)
                # find the frequency and output it
                thefreq = (which+x1)*RATE/chunk
                freq = thefreq
                if thefreq > 2500:
                    if counter == 0:
                        print("First millisecond")
                        counter = counter + 1
                    else:
                        result = firebaseObject.post('/sound', {'decibels': thefreq, 'tag': "High frequency"})
                        print(thefreq)
                        counter = counter + 1
                else:
                    counter = counter + 1
                    result = firebaseObject.post('/sound', {'decibels': thefreq, 'tag': "Low frequency"})

            else:
                thefreq = which*RATE/chunk
                result = firebaseObject.post('/sound', {'decibels': thefreq})
            # read some more data
            data = wf.readframes(chunk)
        if data:
            stream.write(data)
        stream.close()
        p.terminate()