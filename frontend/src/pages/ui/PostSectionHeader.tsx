type PostSectionHeaderProps = {
  title: string;
};

const PostSectionHeader: React.FC<PostSectionHeaderProps> = ({ title }) => {
  return (
    <h2 className="text-lg text-white font-semibold mt-6">{title}</h2>
  );
};

export default PostSectionHeader;
