interface IButton {
  type: string;
  reply: {
    id: string,
    title: string;
  };
}

interface ISection {
  title: string,
  rows: { id: string, title: string }[],
}

interface IMessageContent {
  type: string;
  body: {
    text: string;
  };
  footer?: {
    text: string;
  };
  action?: {
    buttons?: IButton[];
    button?: string,
    sections?: ISection[];
  }
}

interface ISendMessageData {
  messaging_product: string;
  to?: string;
  recipient_type?: string;
  status?: string;
  type?: string;
  text?: {
    body: string;
  };
  interactive?: {
    type: string,
    body: {
      text: string;
    },
    footer?: {
      text: string;
    }
    action: {
      buttons?: IButton[]
    }
  }
  message_id?: string;
  messages?: [
    {
      id: string;
    }
  ]
}

export { IMessageContent, ISendMessageData };

