import { createClient } from '@deepgram/sdk';
import fs from 'fs';

export async function audioTranscribe(file: string): Promise<string> {
  // STEP 1: Create a Deepgram client using the API key
  const deepgram = createClient(process.env.DEEPGRAM_API_KEY);

  // STEP 2: Call the transcribeFile method with the audio payload and options
  const { result, error } = await deepgram.listen.prerecorded.transcribeFile(
    // path to the audio file
    fs.readFileSync(file),
    // STEP 3: Configure Deepgram options for audio analysis
    {
      model: "whisper-large",
      smart_format: true,
      language: 'pt'
    }
  );

  if (error) throw error;
  // STEP 4: Print the results
  if (!error) return result.results.channels[0].alternatives[0].transcript;
}