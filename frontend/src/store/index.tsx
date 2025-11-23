import React from 'react';
import { ProfileProvider } from './profile/provider';
import { PostsProvider } from './posts/provider';

const providers = [ProfileProvider, PostsProvider];

export const ContextProvider = ({ children }: React.PropsWithChildren) => (
  <>
    {providers.reduceRight(
      (acc, Provider) => (
        <Provider>{acc}</Provider>
      ),
      children,
    )}
  </>
);
