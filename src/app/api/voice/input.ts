declare const window: Window

const synth = window.window.speechSynthesis;

export const populateVoiceList = () => {
  try {
    const voices = synth.getVoices();
    return voices.sort((a: SpeechSynthesisVoice, b: SpeechSynthesisVoice) => a.name.localeCompare(b.name));
  } catch (err) {
    console.log(err);
  }
};

export const sayInput = (
  speechValue: string,
  inputVoice: string,
  pitch: number,
  rate: number
) => {
  const utterance = new SpeechSynthesisUtterance(speechValue);

  populateVoiceList()?.forEach((voice: SpeechSynthesisUtterance["voice"]) => {
    if (voice?.name === inputVoice) {
      utterance.voice = voice;
      return;
    }
  });

  utterance.pitch = pitch;
  utterance.rate = rate;

  window.speechSynthesis.cancel();
  synth.speak(utterance);
};