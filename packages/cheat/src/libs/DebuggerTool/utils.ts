export function findEvent(x: number, y: number, index?: number) {
  const events = $gameMap.eventsXy(x, y);
  if (events.length < 0) {
    console.log("No event found.");
  } else if (events.length > 1 && index == undefined) {
    console.log("Multiple events found.");
  } else {
    return events[index ?? 0];
  }
}

export function pageHasCondition(page: RPG.EventPage) {
  return (
    page.conditions.actorValid ||
    page.conditions.itemValid ||
    page.conditions.selfSwitchValid ||
    page.conditions.switch1Valid ||
    page.conditions.switch2Valid ||
    page.conditions.switch3Valid ||
    page.conditions.variableValid
  );
}

export function selfSwitchTools(
  eventId: number,
  selfSwitchCh: string,
  value: boolean | undefined = undefined
) {
  const mapId = $gameMap.mapId();
  if (value != undefined) {
    return $gameSelfSwitches.setValue([mapId, eventId, selfSwitchCh], value);
  }
  return $gameSelfSwitches.value([mapId, eventId, selfSwitchCh]);
}

export function commonEventInfo(event: RPG.CommonEvent) {
  return {
    id: event.id,
    name: event.name,
    trigger: event.trigger,
    switchId: event.switchId,
    list: event.list,
    referenceSwitches: event.list
      .filter((command) => command.code === 111 && command.parameters[0] === 0)
      .map((command) => command.parameters[1]),
    referenceVariables: event.list
      .filter((command) => command.code === 111 && command.parameters[0] === 1)
      .map((command) => command.parameters[1]),
  };
}
