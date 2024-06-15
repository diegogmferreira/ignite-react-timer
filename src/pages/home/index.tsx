import { zodResolver } from '@hookform/resolvers/zod'
import { Pause, Play } from 'phosphor-react'
import { FormProvider, useForm } from 'react-hook-form'
import * as zod from 'zod'

import { useContext } from 'react'
import { CyclesContext } from '../../contexts/CyclesContext'
import { Countdown } from './components/countdown'
import { NewCycleForm } from './components/newCycleForm'

import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number().min(5).max(60),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 5,
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm

  const { activeCycle, createNewCycle, handleInterruptCycle } =
    useContext(CyclesContext)

  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data)
    reset()
  }

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {activeCycle ? (
          <StopCountdownButton type="button" onClick={handleInterruptCycle}>
            <Pause size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
            <Play size={24} />
            Iniciar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
