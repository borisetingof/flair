import { useNavigation, useRoute } from '@react-navigation/native';
import {
  TopNavigation,
  Divider,
  Layout,
  Text,
  List,
  ListItem,
  Icon,
} from '@ui-kitten/components';
import React from 'react';
import { Dimensions, Image, StyleSheet, SafeAreaView } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const Details = () => {
  const { goBack } = useNavigation();
  const {
    params: { name, description, thumbnail, comics, stories, events, series },
  } = useRoute();

  return (
    <Layout style={styles.layout}>
      <SafeAreaView style={styles.safeAreaView}>
        <TopNavigation
          title={name}
          alignment="center"
          testID="details-top-nav"
          accessoryLeft={() => (
            <Icon
              testID="back-button"
              onPress={goBack}
              style={styles.icon}
              fill="#000"
              name="arrow-back"
            />
          )}
        />

        <List
          testID="details-list"
          ListHeaderComponent={() => (
            <>
              <Image
                source={{ uri: `${thumbnail.path}.${thumbnail.extension}` }}
                style={styles.image}
                resizeMode={
                  thumbnail.path.includes('not_available') ? 'contain' : 'cover'
                }
              />

              <BarChart
                data={{
                  labels: ['comics', 'stories', 'events', 'series'],
                  datasets: [
                    {
                      data: [
                        comics.available,
                        stories.available,
                        events.available,
                        series.available,
                      ],
                    },
                  ],
                }}
                width={Dimensions.get('window').width}
                height={220}
                chartConfig={{
                  barPercentage: 1.5,
                  decimalPlaces: 0,
                  backgroundGradientFrom: '#ed1d24',
                  backgroundGradientTo: '#b4080e',
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: () => '#fff',
                }}
              />

              {description ? (
                <Text style={styles.description} testID={description}>
                  {description}
                </Text>
              ) : null}
            </>
          )}
          data={comics.items.sort()}
          renderItem={({ item: { name: title } }) => <ListItem title={title} />}
          maxToRenderPerBatch={30}
          initialNumToRender={30}
          removeClippedSubviews={true}
          ItemSeparatorComponent={Divider}
        />
      </SafeAreaView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  layout: { flexGrow: 1 },
  safeAreaView: { flexGrow: 1, flexBasis: '100%' },
  icon: { width: 32, height: 32 },
  image: { width: '100%', aspectRatio: 1, backgroundColor: '#fff' },
  description: { padding: 20 },
});

export default Details;
