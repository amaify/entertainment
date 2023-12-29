import type { Meta, StoryObj } from "@storybook/react";
import Button from "../components/ui/button";

const meta = {
  title: "Example/Button",
  component: Button,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
} as Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoginButton: Story = {
  args: {
    children: "Login to your account"
  }
};
