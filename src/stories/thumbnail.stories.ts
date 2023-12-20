import Thumbnail from "@/components/thumbnail/thumbnail";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Thumbnail",
  component: Thumbnail,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      options: ["trending", "popular"],
      control: { type: "radio" },
    },
  },
  parameters: {
    backgrounds: {
      default: "primary background",
      values: [
        {
          name: "primary background",
          value: "#10141E",
        },
      ],
    },
    layout: "centered",
  },
} as Meta<typeof Thumbnail>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ThumbnailStory: Story = {
  args: {
    variant: "trending",
  },
};
