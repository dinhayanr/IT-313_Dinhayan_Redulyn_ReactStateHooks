import { useEffect, useState } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

function useStopwatch(isRunning: boolean) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    const interval = setInterval(() => {
      setSeconds((currentSeconds) => currentSeconds + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);

  return seconds;
}

function PracticeTracker({
  solved,
  onSolve,
  onReset,
}: {
  solved: number;
  onSolve: () => void;
  onReset: () => void;
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>
        Practice Tracker
      </Text>

      <Text style={styles.solved}>
        Solved: {solved}
      </Text>

      <View style={styles.button}>
        <Button
          title="Solve +1"
          onPress={onSolve}
        />
      </View>

      <View style={styles.button}>
        <Button
          title="Reset"
          onPress={onReset}
        />
      </View>

      {solved >= 5 && (
        <Text style={styles.success}>
          Great job!
        </Text>
      )}
    </View>
  );
}

function Stopwatch({
  seconds,
  isRunning,
}: {
  seconds: number;
  isRunning: boolean;
}) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedTime =
    `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>
        Lab Stopwatch
      </Text>

      <Text style={styles.timer}>
        {formattedTime}
      </Text>

      {isRunning ? (
        <Text style={styles.status}>
          Running...
        </Text>
      ) : (
        <Text style={styles.status}>
          Paused
        </Text>
      )}
    </View>
  );
}

function LabScreen() {
  const [solved, setSolved] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const seconds = useStopwatch(isRunning);

  const handleSolve = () => {
    setSolved((s) => s + 1);
  };

  const handleReset = () => {
    setSolved(0);
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        Lab Timer & Practice Tracker
      </Text>

      <PracticeTracker
        solved={solved}
        onSolve={handleSolve}
        onReset={handleReset}
      />

      <Stopwatch
        seconds={seconds}
        isRunning={isRunning}
      />

      <View style={styles.controls}>
        <View style={styles.button}>
          <Button
            title="Start"
            onPress={handleStart}
          />
        </View>

        <View style={styles.button}>
          <Button
            title="Stop"
            onPress={handleStop}
          />
        </View>
      </View>
    </ScrollView>
  );
}

export default function HomeScreen() {
  return <LabScreen />;
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
    paddingTop: 60,
  },

  title: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },

  solved: {
    fontSize: 22,
    textAlign: "center",
    marginBottom: 15,
  },

  timer: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },

  status: {
    fontSize: 18,
    textAlign: "center",
  },

  success: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 15,
  },

  controls: {
    marginTop: 5,
  },

  button: {
    marginVertical: 5,
  },
});