import { View, Text, FlatList, StyleSheet, RefreshControl } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Skeleton } from 'moti/skeleton';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

const SkeletonCommonProps = {
  colorMode: 'light',
  backgroundColor: '#D4d4d4',
  transition: {
    type: 'timing',
    duration: 2000,
  },
} as const;

const home: React.FC = () => {
  const [usersData, setUsersData] = useState<User[] | undefined>([]);
  const [isSkeletonLoading, setIsSkeletonLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: User[] = await response.json();
      setUsersData(data);
      setIsSkeletonLoading(true)
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setIsSkeletonLoading(false)
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = async () => {
    setIsSkeletonLoading(true);
    await fetchData();
  };

  const renderItem = ({ item }: { item: User }) => (
    <View style={{ flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderColor: '#ddd' }}>
      <Skeleton.Group show={isSkeletonLoading}>
      <Skeleton width={70} height={70} radius={'round'} {...SkeletonCommonProps}>
        <View style={{ width: 50, height: 50, backgroundColor: '#0000FF', margin: 10, marginRight: 15, borderRadius: 25 }} />
      </Skeleton>
      <View>
        <View style={styles.data}>
          <Skeleton width={'75%'} height={20} {...SkeletonCommonProps}>
            <Text>ID: {item.id}</Text>
          </Skeleton>
        </View>
        <View style={styles.data}>
          <Skeleton {...SkeletonCommonProps}>
            <Text>Name: {item.name}</Text>
          </Skeleton>
        </View>
        <View style={styles.data}>
          <Skeleton {...SkeletonCommonProps}>
            <Text>Username: {item.username}</Text>
          </Skeleton>
        </View>
        <View style={styles.data}>
          <Skeleton {...SkeletonCommonProps}>
            <Text>Email: {item.email}</Text>
          </Skeleton>
        </View>
      </View>
      </Skeleton.Group>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={usersData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={<RefreshControl refreshing={isSkeletonLoading} onRefresh={handleRefresh} />}
      />
    </View>
  );
};

export default home;

const styles = StyleSheet.create({
  data: {
    marginBottom: 10,
  },
});
