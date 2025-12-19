import { FileButton,
    Tooltip,
    Avatar,
    ThemeIcon
 } from "@mantine/core";
 import { ReactComponent as DonwloadIcon } from './assets/donwload.svg'
import { AvatarUploadTexts } from './type/profile-texts';



interface AvatarUploadProps {
  avatarUrl: string | null;
  onFileChange: (file: File | null) => void;
  userName: string;
  textData:AvatarUploadTexts
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({ avatarUrl, onFileChange, userName, textData }) => {
  return (
    <>
      {avatarUrl ? (
        <FileButton
          onChange={onFileChange}
          accept="image/png,image/jpeg,image/jpg"
        >
          {(props) => (
            <Tooltip label={userName} withArrow>
              <Avatar
                {...props}
                src={avatarUrl}
                alt={textData.avatarUser}
                size="xl"
                radius="xl"
                mb='xs'
                style={{ cursor: 'pointer' }}
              />
            </Tooltip>
          )}
        </FileButton>
      ) : (
        <FileButton
          onChange={onFileChange}
          accept="image/png,image/jpeg,image/jpg"
        >
          {(props) => (
            <ThemeIcon
              component='button'
              {...props}
              size="xl"
              radius="md"
              color="var(--mantine-color-gray-4)"
              style={{ cursor: 'pointer' }}
              mb='xs'
            >
              <DonwloadIcon style={{ width: '40%', height: '40%' }} />
            </ThemeIcon>
          )}
        </FileButton>
      )}
    </>
  );
};

export default AvatarUpload;
   