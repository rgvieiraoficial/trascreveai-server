export interface IWebhookEventBody {
  entry: [
    {
      changes: [
        {
          response: object,
          value: {
            metadata: {
              phone_number_id: string;
            },
            contacts: [
              {
                profile: {
                  name: string;
                }
              }
            ],
            messages: [
              {
                id: string;
                from: string;
                type: string;
                text: {
                  body: string;
                },
                interactive: {
                  type: string,
                  list_reply?: {
                    id: string,
                    title: string
                  },
                  button_reply?: {
                    id: string,
                    title: string
                  }
                },
                audio: {
                  id: string;
                  sha256: string;
                }
              }
            ]
          }
        }
      ]
    }
  ];
}