import Button from "@/components/ui/button";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Example/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} as Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoginButton: Story = {
  args: {
    children: "Login to your account",
  },
};
