import * as Location from 'expo-location';
import { Linking, Platform } from 'react-native';
import type { TriageLevel } from '../types';

export async function openNearestUnit(level: TriageLevel): Promise<void> {
  if (level === 'SAMU') {
    await Linking.openURL('tel:192');
    return;
  }

  const query = level === 'UPA' ? 'UPA+unidade+de+pronto+atendimento' : 'UBS+unidade+básica+de+saúde';

  try {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status === 'granted') {
      const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
      const { latitude, longitude } = location.coords;

      const mapsUrl = Platform.select({
        ios: `maps://maps.apple.com/?q=${query}&ll=${latitude},${longitude}`,
        android: `geo:${latitude},${longitude}?q=${query}`,
        default: `https://www.google.com/maps/search/${query}/@${latitude},${longitude},14z`,
      });

      await Linking.openURL(mapsUrl!);
    } else {
      const fallbackUrl = `https://www.google.com/maps/search/${query}`;
      await Linking.openURL(fallbackUrl);
    }
  } catch {
    const fallbackUrl = `https://www.google.com/maps/search/${query}`;
    await Linking.openURL(fallbackUrl);
  }
}

export async function callSamu(): Promise<void> {
  await Linking.openURL('tel:192');
}
