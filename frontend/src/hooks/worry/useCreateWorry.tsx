import { FormEvent } from "react";
import { NewWorry, useCreateWorryMutation } from "../../generated/graphql";

export const useCreateWorry = (props: NewWorry) => {
    const { title, notes } = props;

    const [createWorry] = useCreateWorryMutation({
        variables: {
            title: title,
            notes: notes
        }
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        createWorry();
    }

    return [handleSubmit];
}
