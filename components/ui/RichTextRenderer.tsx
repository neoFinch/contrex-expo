import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  paragraph: {
    marginBottom: 10,
    fontSize: 16,
    lineHeight: 22,
    color: '#777',
  },
  unorderedList: {
    marginBottom: 10,
    marginLeft: 20,
    color: '#777',
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 5,
    color: '#777',
  },
  bullet: {
    width: 10,
    fontSize: 16,
    marginRight: 5,
    color: '#777',
  },
  listItemText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 22,
    color: '#777',
  },
});

const renderText = (children) => {
  if (!children) return null;
  return children.map((child, index) => {
    if (child.type === 'text') {
      return <Text key={index}>{child.text}</Text>;
    }
    return null;
  });
};

const RichTextRenderer = ({ content }) => {
  if (!content) {
    return null;
  }

  return (
    <View>
      {content.map((block, index) => {
        switch (block.type) {
          case 'paragraph':
            return (
              <Text key={index} style={styles.paragraph}>
                {renderText(block.children)}
              </Text>
            );
          case 'list':
            if (block.format === 'unordered') {
              return (
                <View key={index} style={styles.unorderedList}>
                  {block.children.map((item, itemIndex) => (
                    <View key={itemIndex} style={styles.listItem}>
                      <Text style={styles.bullet}> * </Text>
                      <Text style={styles.listItemText}>
                        {renderText(item.children)}
                      </Text>
                    </View>
                  ))}
                </View>
              );
            }
            // Add 'ordered' list rendering here if needed
            return null;
          default:
            return null;
        }
      })}
    </View>
  );
};

export default RichTextRenderer;