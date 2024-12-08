interface Cheat {
  imageHistory: { name: string; src: string }[];
}

interface Window {
  cheat: Cheat;
}
