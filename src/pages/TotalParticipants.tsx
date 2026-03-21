import { useEffect } from "react";
import { useAppStore } from "./appStore";

export default function TotalParticipants() {
  const {
    card1Cutoff1,
    card1Cutoff2,
    card1Cutoff3,
    card1Cutoff4,
    card1Cutoff5,
    card2Cutoff1,
    card2Cutoff2,
    card2Cutoff3,
    card2Cutoff4,
    card2Cutoff5,
    card3Cutoff1,
    card3Cutoff2,
    card3Cutoff3,
    card3Cutoff4,
    card3Cutoff5,
    card4Cutoff1,
    card4Cutoff2,
    card4Cutoff3,
    card4Cutoff4,
    card4Cutoff5,
    card5Cutoff1,
    card5Cutoff2,
    card5Cutoff3,
    card5Cutoff4,
    card5Cutoff5,
    updateLoopArray,
  } = useAppStore();

  const factor1Participants =
    card1Cutoff1 + card1Cutoff2 + card1Cutoff3 + card1Cutoff4 + card1Cutoff5;
  const factor2Participants =
    card2Cutoff1 + card2Cutoff2 + card2Cutoff3 + card2Cutoff4 + card2Cutoff5;
  const factor3Participants =
    card3Cutoff1 + card3Cutoff2 + card3Cutoff3 + card3Cutoff4 + card3Cutoff5;
  const factor4Participants =
    card4Cutoff1 + card4Cutoff2 + card4Cutoff3 + card4Cutoff4 + card4Cutoff5;
  const factor5Participants =
    card5Cutoff1 + card5Cutoff2 + card5Cutoff3 + card5Cutoff4 + card5Cutoff5;

  const TotalParticipants =
    factor1Participants +
    factor2Participants +
    factor3Participants +
    factor4Participants +
    factor5Participants;

  useEffect(() => {
    updateLoopArray([
      [card1Cutoff1, card1Cutoff2, card1Cutoff3, card1Cutoff4, card1Cutoff5],
      [card2Cutoff1, card2Cutoff2, card2Cutoff3, card2Cutoff4, card2Cutoff5],
      [card3Cutoff1, card3Cutoff2, card3Cutoff3, card3Cutoff4, card3Cutoff5],
      [card4Cutoff1, card4Cutoff2, card4Cutoff3, card4Cutoff4, card4Cutoff5],
      [card5Cutoff1, card5Cutoff2, card5Cutoff3, card5Cutoff4, card5Cutoff5],
    ]);
  }, [
    card1Cutoff1,
    card1Cutoff2,
    card1Cutoff3,
    card1Cutoff4,
    card1Cutoff5,
    card2Cutoff1,
    card2Cutoff2,
    card2Cutoff3,
    card2Cutoff4,
    card2Cutoff5,
    card3Cutoff1,
    card3Cutoff2,
    card3Cutoff3,
    card3Cutoff4,
    card3Cutoff5,
    card4Cutoff1,
    card4Cutoff2,
    card4Cutoff3,
    card4Cutoff4,
    card4Cutoff5,
    card5Cutoff1,
    card5Cutoff2,
    card5Cutoff3,
    card5Cutoff4,
    card5Cutoff5,
    updateLoopArray,
  ]);

  return (
    <div className="flex flex-wrap flex-row gap-6 justify-center items-center w-[600px]">
      <div>{`P1: ${factor1Participants}`}</div> <div> {`P2: ${factor2Participants}`}</div>{" "}
      <div> {`P3: ${factor3Participants}`}</div>
      <div>{`P4: ${factor4Participants}`}</div> <div>{`P5: ${factor5Participants}`}</div>{" "}
      <div>{`Total: ${TotalParticipants} participants`}</div>
    </div>
  );
}
