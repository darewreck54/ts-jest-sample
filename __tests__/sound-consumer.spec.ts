import { SoundPlayer } from "./../src/sound/sound-player";
import { SoundPlayerConsumer } from "./../src/sound/sound-player-consumer";
jest.mock("./../src/sound/sound-player"); // SoundPlayer is now a mock constructor

let s = SoundPlayer as jest.Mock<SoundPlayer>;
beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  s.mockClear();
});

it("We can check if the consumer called the class constructor", () => {
  let soundPlayerConsumer = new SoundPlayerConsumer();
  //soundPlayerConsumer.playSomethingCool();
  expect(s).toHaveBeenCalledTimes(1);
});

it("We can check if the consumer called a method on the class instance", () => {
  // Show that mockClear() is working:
  expect(SoundPlayer).not.toHaveBeenCalled();

  const soundPlayerConsumer = new SoundPlayerConsumer();
  // Constructor should have been called again:
  expect(SoundPlayer).toHaveBeenCalledTimes(1);

  const coolSoundFileName = "song.mp3";
  soundPlayerConsumer.playSomethingCool();

  s = SoundPlayer as jest.Mock<SoundPlayer>;
  // mock.instances is available with automatic mocks:
  const mockSoundPlayerInstance = s.mock.instances[0];
  const mockPlaySoundFile = mockSoundPlayerInstance.playSoundFile;
  let m = soundPlayerConsumer["soundPlayer"].playSoundFile as jest.Mock;
  expect(m.calls[0][0]).toEqual(coolSoundFileName);
  // Equivalent to above check:
  expect(mockPlaySoundFile).toHaveBeenCalledWith(coolSoundFileName);
  expect(mockPlaySoundFile).toHaveBeenCalledTimes(1);
});