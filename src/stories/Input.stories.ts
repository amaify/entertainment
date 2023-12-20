import Input from "@/components/ui/input";
import type { StoryObj, Meta } from "@storybook/react";

const meta = {
  title: "Input/Search",
  component: Input,
  tags: ["autodocs"],
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
} as Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SearchInput: Story = {
  args: {
    variant: "searchInput",
    placeholder: "Search for movies or TV series",
  },
};

export const FormInput: Story = {
  args: {
    variant: "formInput",
    placeholder: "Email address",
    name: "email",
    inputError: {
      email: "Not valid",
    },
  },
};
