import MyMessage from './MyMessage';
import TheirMessage from './TheirMessage';
import MessageForm from './MessageForm';

const ChatFeed = (props) => {
  const { chats, activeChat, userName, messages } = props;

  const chat = chats && chats[activeChat];

  const renderReadReceipts = (message, isMyMessage) => chat.people.map((person) => {
    if (person.last_read === message.id) {
      return (
        <div
          key={`read_${person.person.username}`}
          className="read-receipt"
          style={{
            float: isMyMessage ? 'right' : 'left',
            backgroundImage: person.person.avatar && `url(${person.person.avatar})`,
          }}
        />
      );
    } else {
      return null;
    }
  });

  const renderMessages = Object.values(messages).map((message) => {
    const lastMessage = messages[message.id - 1];
    const isMyMessage = userName === message.sender.username;

    return (
      <div key={message.id} style={{ width: '100%' }}>
        <div className="message-block">
          {isMyMessage
            ? <MyMessage message={message} />
            : <TheirMessage message={message} lastMessage={lastMessage} />}
        </div>
        <div className="read-receipts" style={{ marginRight: isMyMessage ? '18px' : '0px', marginLeft: isMyMessage ? '0px' : '68px' }}>
          {renderReadReceipts(message, isMyMessage)}
        </div>
      </div>
    );
  });

  if (!chat) return <div />;

  return (
    <div className="chat-feed">
      <div className="chat-title-container">
        <div className="chat-title">{chat.title}</div>
        <div className="chat-subtitle">
          {chat.people.map((person) => ` ${person.person.username}`)}
        </div>
      </div>
      {renderMessages}
      <div style={{ height: '100px' }} />
      <div className="message-form-container">
        <MessageForm {...props} chatId={activeChat} />
      </div>
    </div>
  );
};

export default ChatFeed;
