import { useNavigation } from '@react-navigation/native';
import {
  TopNavigation,
  Divider,
  List,
  ListItem,
  Input,
  Spinner,
  Layout,
  Text,
} from '@ui-kitten/components';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import { url } from './config.json';
import useData from './useData';

const Gallery = () => {
  const { navigate } = useNavigation();
  const { data, loading, error } = useData(url);
  const [search, setSearch] = useState();

  return (
    <Layout style={styles.layout}>
      <SafeAreaView style={styles.safeAreaView}>
        <TopNavigation
          title="Marvel Heroes"
          alignment="center"
          testID="gallery-top-nav"
          accessoryRight={loading ? () => <Spinner size="small" /> : null}
        />

        {error ? (
          <Text>{error.message || 'Sorry, something went wrong.'}</Text>
        ) : (
          <>
            <Input
              value={search}
              onChangeText={setSearch}
              autoCapitalize="none"
              autoCorrect={false}
              testID="search"
              placeholder="search"
            />

            <List
              data={
                search
                  ? data.filter(({ name }) =>
                      name.toLowerCase().includes(search.toLowerCase()),
                    )
                  : data
              }
              renderItem={({ item }) => (
                <ListItem
                  title={item.name}
                  onPress={() => navigate('Details', { ...item })}
                />
              )}
              maxToRenderPerBatch={30}
              initialNumToRender={30}
              removeClippedSubviews={true}
              ItemSeparatorComponent={Divider}
            />
          </>
        )}
      </SafeAreaView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  layout: { flexGrow: 1, paddingHorizontal: 20 },
  safeAreaView: { flexGrow: 1, flexBasis: '100%' },
});

export default Gallery;
