import { useEffect } from "react";
import { useAppStore } from "./appStore";

export default function TotalParticipants() {
  const {
    card1Cutoff1,
    card1Cutoff2,
    card1Cutoff3,
    card1Cutoff4,
    card1Cutoff5,
    card1Cutoff6,
    card1Cutoff7,
    card1Cutoff8,
    card1Cutoff9,
    card1Cutoff10,

    card2Cutoff1,
    card2Cutoff2,
    card2Cutoff3,
    card2Cutoff4,
    card2Cutoff5,
    card2Cutoff6,
    card2Cutoff7,
    card2Cutoff8,
    card2Cutoff9,
    card2Cutoff10,

    card3Cutoff1,
    card3Cutoff2,
    card3Cutoff3,
    card3Cutoff4,
    card3Cutoff5,
    card3Cutoff6,
    card3Cutoff7,
    card3Cutoff8,
    card3Cutoff9,
    card3Cutoff10,

    card4Cutoff1,
    card4Cutoff2,
    card4Cutoff3,
    card4Cutoff4,
    card4Cutoff5,
    card4Cutoff6,
    card4Cutoff7,
    card4Cutoff8,
    card4Cutoff9,
    card4Cutoff10,

    card5Cutoff1,
    card5Cutoff2,
    card5Cutoff3,
    card5Cutoff4,
    card5Cutoff5,
    card5Cutoff6,
    card5Cutoff7,
    card5Cutoff8,
    card5Cutoff9,
    card5Cutoff10,

    updateLoopArray,
    isOn,
  } = useAppStore();

  const factor1Participants =
    card1Cutoff1 +
    card1Cutoff2 +
    card1Cutoff3 +
    card1Cutoff4 +
    card1Cutoff5 +
    card1Cutoff6 +
    card1Cutoff7 +
    card1Cutoff8 +
    card1Cutoff9 +
    card1Cutoff10;
  const factor2Participants =
    card2Cutoff1 +
    card2Cutoff2 +
    card2Cutoff3 +
    card2Cutoff4 +
    card2Cutoff5 +
    card2Cutoff6 +
    card2Cutoff7 +
    card2Cutoff8 +
    card2Cutoff9 +
    card2Cutoff10;
  const factor3Participants =
    card3Cutoff1 +
    card3Cutoff2 +
    card3Cutoff3 +
    card3Cutoff4 +
    card3Cutoff5 +
    card3Cutoff6 +
    card3Cutoff7 +
    card3Cutoff8 +
    card3Cutoff9 +
    card3Cutoff10;
  const factor4Participants =
    card4Cutoff1 +
    card4Cutoff2 +
    card4Cutoff3 +
    card4Cutoff4 +
    card4Cutoff5 +
    card4Cutoff6 +
    card4Cutoff7 +
    card4Cutoff8 +
    card4Cutoff9 +
    card4Cutoff10;
  const factor5Participants =
    card5Cutoff1 +
    card5Cutoff2 +
    card5Cutoff3 +
    card5Cutoff4 +
    card5Cutoff5 +
    card5Cutoff6 +
    card5Cutoff7 +
    card5Cutoff8 +
    card5Cutoff9 +
    card5Cutoff10;

  const TotalParticipants =
    factor1Participants +
    factor2Participants +
    factor3Participants +
    factor4Participants +
    factor5Participants;

  useEffect(() => {
    updateLoopArray([
      [
        card1Cutoff1,
        card1Cutoff2,
        card1Cutoff3,
        card1Cutoff4,
        card1Cutoff5,
        card1Cutoff6,
        card1Cutoff7,
        card1Cutoff8,
        card1Cutoff9,
        card1Cutoff10,
      ],
      [
        card2Cutoff1,
        card2Cutoff2,
        card2Cutoff3,
        card2Cutoff4,
        card2Cutoff5,
        card2Cutoff6,
        card2Cutoff7,
        card2Cutoff8,
        card2Cutoff9,
        card2Cutoff10,
      ],
      [
        card3Cutoff1,
        card3Cutoff2,
        card3Cutoff3,
        card3Cutoff4,
        card3Cutoff5,
        card3Cutoff6,
        card3Cutoff7,
        card3Cutoff8,
        card3Cutoff9,
        card3Cutoff10,
      ],
      [
        card4Cutoff1,
        card4Cutoff2,
        card4Cutoff3,
        card4Cutoff4,
        card4Cutoff5,
        card4Cutoff6,
        card4Cutoff7,
        card4Cutoff8,
        card4Cutoff9,
        card4Cutoff10,
      ],
      [
        card5Cutoff1,
        card5Cutoff2,
        card5Cutoff3,
        card5Cutoff4,
        card5Cutoff5,
        card5Cutoff6,
        card5Cutoff7,
        card5Cutoff8,
        card5Cutoff9,
        card5Cutoff10,
      ],
    ]);
  }, [
    card1Cutoff1,
    card1Cutoff2,
    card1Cutoff3,
    card1Cutoff4,
    card1Cutoff5,
    card1Cutoff6,
    card1Cutoff7,
    card1Cutoff8,
    card1Cutoff9,
    card1Cutoff10,
    card2Cutoff1,
    card2Cutoff2,
    card2Cutoff3,
    card2Cutoff4,
    card2Cutoff5,
    card2Cutoff6,
    card2Cutoff7,
    card2Cutoff8,
    card2Cutoff9,
    card2Cutoff10,
    card3Cutoff1,
    card3Cutoff2,
    card3Cutoff3,
    card3Cutoff4,
    card3Cutoff5,
    card3Cutoff6,
    card3Cutoff7,
    card3Cutoff8,
    card3Cutoff9,
    card3Cutoff10,
    card4Cutoff1,
    card4Cutoff2,
    card4Cutoff3,
    card4Cutoff4,
    card4Cutoff5,
    card4Cutoff6,
    card4Cutoff7,
    card4Cutoff8,
    card4Cutoff9,
    card4Cutoff10,
    card5Cutoff1,
    card5Cutoff2,
    card5Cutoff3,
    card5Cutoff4,
    card5Cutoff5,
    card5Cutoff6,
    card5Cutoff7,
    card5Cutoff8,
    card5Cutoff9,
    card5Cutoff10,
    updateLoopArray,
  ]);

  return (
    <div className="flex flex-wrap flex-row gap-6 justify-center items-center w-[600px]">
      <div>{`P1: ${factor1Participants}`}</div>
      <div>{`P2: ${factor2Participants}`}</div> <div> {`P3: ${factor3Participants}`}</div>
      <div>{`P4: ${factor4Participants}`}</div>
      <div>{`P5: ${factor5Participants}`}</div> <div>{`Seeders: ${isOn ? "5" : "0"}`}</div>{" "}
      <div>{`Total: ${isOn ? TotalParticipants + 5 : TotalParticipants} participants`}</div>
    </div>
  );
}
