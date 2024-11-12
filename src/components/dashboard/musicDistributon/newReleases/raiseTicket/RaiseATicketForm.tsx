import React, { useMemo } from 'react';
import { useForm, Controller, } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import RHFTextField from '@/components/hook-form/RHFTextField';
import { Box, Button, Card, CardActions, CardContent, CardHeader, FormControl, Stack } from '@mui/material';
import FormProvider from '@/components/hook-form/FormProvider';

// Validation schema
const RaiseTicketSchema = yup.object().shape({
  subject: yup.string().required('Subject is required'),
  description: yup.string().required('Description is required'),
});

const RaiseATicketForm = () => {

  const defaultValues = useMemo(
    () => ({
      subject: "",
      description: "",
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(RaiseTicketSchema),
    defaultValues
  });
  const { reset, handleSubmit, control } = methods;

  const onSubmit = (data?: any) => {
    console.log('Form Data:', data);
  };

  return (
    <div>
      <Card sx={{minWidth:{sm:'450px'}}}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <CardHeader title="Raise A Ticket" />
          <CardContent >
            <Stack sx={{ gap: 2 }}>

              <RHFTextField fullWidth size='small' name="subject" label="Subject" />

              <RHFTextField fullWidth size='small' name="description" multiline minRows={3} label="Description" />

              <RHFTextField fullWidth disabled size='small' name="phone" label="Phone No." />

              <RHFTextField fullWidth disabled size='small' name="email" label="Email" />
            </Stack>
            <CardActions sx={{ display: 'flex', justifyContent: 'flex-end', mt:2 }}>
              <Button type="submit" variant="contained" size="small" sx={{color:'white', textTransform:'capitalize'}}>Submit</Button>
            </CardActions>
          </CardContent>
        </FormProvider>
      </Card>
    </div>
  );
};

export default RaiseATicketForm;
