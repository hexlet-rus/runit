import { Paper, Title, Button, Text } from '@mantine/core';
import IconLanguage from './assets/Language.svg?react';
import { LanguageCardProps } from './types/components';



const LanguageCard = ({ currentLanguage, onChangeLanguage, textData }: LanguageCardProps) => (
  <Paper radius='lg' shadow='sm' p='md'>
    <Title order={4} mb='sm'>
      {textData.language}
    </Title>
    <Button 
      leftSection={<IconLanguage style={{ width: 20, height: 20 }} />} 
      variant="default" 
      radius='md' 
      mb='sm'
      onClick={onChangeLanguage}
    >
      {currentLanguage}
    </Button>
    <Text c='dimmed' size='sm'>
      {textData.currentLanguage}: {currentLanguage}
    </Text>
  </Paper>
);

export default LanguageCard;