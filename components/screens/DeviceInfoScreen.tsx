import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Clipboard,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getDetailedDeviceInfo, getDeviceId } from '../services/notificationHelper';

interface DeviceInfo {
  isDevice: boolean;
  platform: number | null;
  brand: string | null;
  model: string | null;
  osVersion: string | null;
  osName: string | null;
  deviceId: string;
  androidId: string;
  bundleId: string | null;
  appVersion: string | null;
  buildVersion: string | null;
}

const DeviceInfoScreen = () => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDeviceInfo();
  }, []);

  const loadDeviceInfo = async () => {
    try {
      setLoading(true);
      const info = await getDetailedDeviceInfo();
      setDeviceInfo(info);
    } catch (error) {
      console.error('Error loading device info:', error);
      Alert.alert('Error', 'Không thể tải thông tin thiết bị');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    Clipboard.setString(text);
    Alert.alert('Copied!', `${label} đã được copy vào clipboard`);
  };

  const refreshDeviceInfo = () => {
    loadDeviceInfo();
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Đang tải thông tin thiết bị...</Text>
      </View>
    );
  }

  if (!deviceInfo) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Không thể tải thông tin thiết bị</Text>
        <TouchableOpacity style={styles.retryButton} onPress={refreshDeviceInfo}>
          <Text style={styles.retryButtonText}>Thử lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Thông Tin Thiết Bị</Text>
        <TouchableOpacity style={styles.refreshButton} onPress={refreshDeviceInfo}>
          <Ionicons name="refresh" size={24} color="#4A90E2" />
        </TouchableOpacity>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.cardTitle}>Device ID (Quan trọng cho Firebase)</Text>
        <View style={styles.idContainer}>
          <Text style={styles.deviceIdText}>{deviceInfo.deviceId}</Text>
          <TouchableOpacity
            style={styles.copyButton}
            onPress={() => copyToClipboard(deviceInfo.deviceId, 'Device ID')}
          >
            <Ionicons name="copy" size={20} color="#4A90E2" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.cardTitle}>Android ID</Text>
        <View style={styles.idContainer}>
          <Text style={styles.deviceIdText}>{deviceInfo.androidId}</Text>
          <TouchableOpacity
            style={styles.copyButton}
            onPress={() => copyToClipboard(deviceInfo.androidId, 'Android ID')}
          >
            <Ionicons name="copy" size={20} color="#4A90E2" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.cardTitle}>Thông Tin Cơ Bản</Text>
        <InfoRow label="Thiết bị thật" value={deviceInfo.isDevice ? 'Có' : 'Không'} />
        <InfoRow label="Hệ điều hành" value={deviceInfo.osName || 'Unknown'} />
        <InfoRow label="Phiên bản OS" value={deviceInfo.osVersion || 'Unknown'} />
        <InfoRow label="Thương hiệu" value={deviceInfo.brand || 'Unknown'} />
        <InfoRow label="Model" value={deviceInfo.model || 'Unknown'} />
        <InfoRow label="Platform API" value={deviceInfo.platform?.toString() || 'Unknown'} />
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.cardTitle}>Thông Tin Ứng Dụng</Text>
        <InfoRow label="Bundle ID" value={deviceInfo.bundleId || 'Unknown'} />
        <InfoRow label="App Version" value={deviceInfo.appVersion || 'Unknown'} />
        <InfoRow label="Build Version" value={deviceInfo.buildVersion || 'Unknown'} />
      </View>

      <View style={styles.noteCard}>
        <Text style={styles.noteTitle}>📝 Lưu ý:</Text>
        <Text style={styles.noteText}>
          • Device ID và Android ID là duy nhất cho mỗi thiết bị{'\n'}
          • Sử dụng để thêm fingerprint vào Firebase{'\n'}
          • Copy Device ID để thêm vào Firebase Console{'\n'}
          • Android ID thay đổi khi reset factory
        </Text>
      </View>
    </ScrollView>
  );
};

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}:</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F8FB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  refreshButton: {
    padding: 8,
  },
  infoCard: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  idContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 12,
  },
  deviceIdText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'monospace',
    color: '#333',
  },
  copyButton: {
    padding: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    color: '#333',
    flex: 1,
    textAlign: 'right',
  },
  noteCard: {
    backgroundColor: '#E3F2FD',
    margin: 16,
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 8,
  },
  noteText: {
    fontSize: 14,
    color: '#1976D2',
    lineHeight: 20,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 50,
  },
  errorText: {
    fontSize: 16,
    color: '#E53935',
    textAlign: 'center',
    marginTop: 50,
  },
  retryButton: {
    backgroundColor: '#4A90E2',
    marginTop: 16,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: 'center',
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DeviceInfoScreen; 