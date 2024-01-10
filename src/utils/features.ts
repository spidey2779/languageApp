import axios from "axios";
import { generate } from "random-words";
import _ from "lodash";
const generateMCQ = (words: { Text: string }[], idx: number): string[] => {
  const correctAns: string = words[idx].Text;
  const incorrectAns = words.filter((i) => i.Text !== correctAns);
  const incorrectOptions: string[] = _.sampleSize(incorrectAns, 3).map(
    (i) => i.Text
  );
  const mcqOptions = _.shuffle([...incorrectOptions, correctAns]);
  return mcqOptions;
};
export const translateWords = async (params: langType): Promise<WordType[]> => {
  try {
    const words = generate(8).map((i) => ({
      Text: i,
    }));
    const response = await axios.post(
      "https://microsoft-translator-text.p.rapidapi.com/translate",
      words,
      {
        params: {
          "to[0]": params,
          "api-version": "3.0",
          profanityAction: "NoAction",
          textType: "plain",
        },
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key":
            "130f5a9606mshd0906cedc47de10p16437djsn4ee989df072b",
          "X-RapidAPI-Host": "microsoft-translator-text.p.rapidapi.com",
        },
      }
    );
    const receive: FetchedDataType[] = response.data;
    const arr: WordType[] = receive.map((i, idx) => {
      const options: string[] = generateMCQ(words, idx);
      return {
        word: i.translations[0].text,
        meaning: words[idx].Text,
        options,
      };
    });

    return arr;
  } catch (e) {
    console.log(e);
    throw new Error("something went wrong");
  }
};

export const countMatchingElements = (
  arr1: string[],
  arr2: string[]
): number => {
  if (arr1.length !== arr2.length) throw new Error("Array length mismatch");

  let count = 0;
  let i: string;
  for (i in arr1) {
    if (arr1[i] === arr2[i]) count++;
  }
  return count;
};

//fetching audio
export const fetchAudio = async (
  text: string,
  language: langType
): Promise<string> => {
  const key = import.meta.env.VITE_RAPID_API;
  const url = import.meta.env.VITE_TEXT_TO_SPEECH;
  const rapidkey = import.meta.env.VITE_RAPID_KEY;

  const encodedParams = new URLSearchParams({
    src: text,
    r:"0",
    c:"mp3",
    f:"8khz_8bit_mono",
    b64:"true",
  });
  if (language === "ja") encodedParams.set("hl", "ja-jp");
  else if (language === "hi") encodedParams.set("hl", "hi-in");
  else if (language === "es") encodedParams.set("hl", "es-es");
  else encodedParams.set("hl", "fr-fr");



  const { data }: { data: string } = await axios.post(url, encodedParams, {
    params: {  key :key },
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": rapidkey,
      "X-RapidAPI-Host": "voicerss-text-to-speech.p.rapidapi.com",
    },
  });

  return data;
};
