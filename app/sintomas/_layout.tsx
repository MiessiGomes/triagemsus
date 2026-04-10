import { Stack } from 'expo-router';
import { View } from 'react-native';
import { ProgressBar } from '../../components/ui/ProgressBar';

const STEPS = ['principais', 'duracao', 'intensidade', 'associados'];

export default function SintomasLayout() {
  return (
    <Stack
      screenOptions={({ route }) => {
        const name = route.name as string;
        const stepIndex = STEPS.indexOf(name) + 1;
        return {
          headerShown: true,
          header: () => (
            <View style={{ backgroundColor: '#FAFAFA', paddingTop: 48 }}>
              <ProgressBar current={stepIndex} total={STEPS.length} />
            </View>
          ),
        };
      }}
    />
  );
}
