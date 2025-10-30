import React from "react";
import ReactPlayer from 'react-player';
import '../assets/styles/Project.scss';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/prism';
import '../assets/styles/CarouselOverrides.scss';
import itchIcon from '../assets/images/itch logo.png'
import GitHubIcon from '@mui/icons-material/GitHub';
import ClocktergeistDesign from '../assets/images/clocktergeistdesign.png'
import Navbar from '../assets/images/navbar.png'

function Project() {
    return (
        <div className="projects-container" id="projects">
            <h1>Projects</h1>
            <div className="project">
                <div className="project-text">
                    <h2>Forgeborn</h2>
                    <p> Forgeborn is a fantasy Blacksmith Simulator set in medieval times with custom code, custom art, and custom sounds and music. This game was created
                        in about a month for the 2025 "ThatGameCompany x Coreblazer" game jam.
                        As the sole programmer, I designed all the code in the game to be data driven and use excellent inheritance practices to minimize the amount of extra work
                        I would have to do throughout the project. The workstations are a great example of this; using inheritance made it easy to add entries to the action log, and play
                        sounds when items were completed. The quick time event minigames use timers and input checks to determine player success, and those events 
                        are also data driven and unique per-item, meaning that a Viridium Sword and an Iron Sword have different quick time events - a design decision
                        that allows players to become more immersed in the blacksmithing experience. While working on the camera system, I was surprised at how complex
                        it became due to the need to possess an invisible pawn and perform some interpolation when returning to the player-controlled camera, ensuring that
                        the camera returned to the correct location.
                        The project files are linked below
                    </p>
                    <h3>Key Skills & Features</h3>
                    <ul>
                        <li>Technical Game Design</li>
                        <li>Systems Architecture</li>
                        <li>Custom Common UI Hierarchy</li>
                        <li>Robust interaction system</li>
                        <li>Customer and order generation systems</li>
                        <li>Order Log/Quest Log</li>
                        <li>Camera transition systems</li>
                        <li>Simple AI</li>
                        <li>C++ and Blueprint Programming</li>
                        <li>Component-based Design (Inventory, temperature)</li>
                        <li>Fully data-driven systems</li>
                        <li>Inheritance</li>
                        <li>Subversion</li>
                    </ul>
                    <div className="project-buttons">
                        <a 
                            href="https://github.com/pterafier/Forgeborn"
                            target="_blank" 
                            rel="noreferrer"
                            className="project-btn github-btn"
                        >
                            <GitHubIcon style={{ fontSize: '1.2rem' }} /> View Source Code
                        </a>

                        <a 
                            href="https://pterafier.itch.io/forgeborn" 
                            target="_blank" 
                            rel="noreferrer"
                            className="project-btn itch-btn"
                        >
                            <img 
                            src={itchIcon} 
                            alt="Itch.io"
                            className="itch-icon"
                            style={{ width: '1.2rem', height: '1.2rem' }}
                            /> 
                            Play on Itch.io
                        </a>
                    </div>
                </div>
                
                <div className="project-carousel">
                    <Carousel
                    showThumbs={false}
                    showStatus={false}
                    infiniteLoop
                    autoPlay={false}
                    interval={3000}
                    transitionTime={400}
                    stopOnHover
                    emulateTouch={false}
					swipeable={false}
                    >
                    <div className="video-wrapper">
                        <ReactPlayer 
                            src="https://www.youtube.com/watch?v=4wdce7O4NT4&t=8s"
                            width="100%"
                            height="100%"
                            controls
                            playing={true}
                            muted={true}
                        />
                    </div>
                    <div className="blueprint-script">
                        <iframe title="WorkstationBase" src="https://blueprintue.com/render/nh9ca2vs/" scrolling="no" allowFullScreen></iframe>
                        <p className="legend">Function in the workstation base class that all workstations inherit from (use full screen on mobile)</p>
                    </div>
                    <div className="code-slide">
                        <SyntaxHighlighter
                            language="cpp"
                            style={nightOwl}
                            customStyle={{
                                width: "90%",
                                height: "90%",
                                background: "#1e1e1e",
                                borderRadius: "8px",
                                padding: ".25rem",
                                boxSizing: "border-box",
                                overflow: "auto",
                            }}
                        >
{`// MinigameWidgetBase.cpp
// Here to showcase timer/minigame management

void UMinigameWidgetBase::StartQuicktimeEventTimers()
{
	StartCountdown();
	MinigameStarted = true;
}

void UMinigameWidgetBase::EndQuickTimeEvent()
{
	StopTimer(CountdownTimerHandle);
	GetTimerResults();
	
	//GEngine->AddOnScreenDebugMessage(-1, 3.f, FColor::Green, "Countdown Timer stopped");
}

void UMinigameWidgetBase::StartCountdown()
{
	GetWorld()->GetTimerManager().SetTimer(CountdownTimerHandle, this, &ThisClass::EventTimeout, QuickTimeEventDuration);
	StartTimer(10.0f);

	//GEngine->AddOnScreenDebugMessage(-1, 3.f, FColor::Green, "Countdown started");
}

void UMinigameWidgetBase::StartTimer(float Duration)
{
	GetWorld()->GetTimerManager().SetTimer(TimerHandle, Duration, false);
	
	//GEngine->AddOnScreenDebugMessage(-1, 3.f, FColor::Green, "Timer started");
}

void UMinigameWidgetBase::StopTimer(FTimerHandle InTimerHandle)
{
	GetWorld()->GetTimerManager().ClearTimer(InTimerHandle);
}

float UMinigameWidgetBase::GetTimerResults()
{
	if (!MinigameStarted) return -1.f;
	
    // cache the elapsed time before stopping the timer to get accurate results
	StoppedTimeValue = GetWorld()->GetTimerManager().GetTimerElapsed(TimerHandle);
	StopTimer(TimerHandle);

	//GEngine->AddOnScreenDebugMessage(-1, 3.f, FColor::Green, "Timer stopped");
	//GEngine->AddOnScreenDebugMessage(-1, 3.f, FColor::Green, FString::Printf(TEXT("Time elapsed: %f"), StoppedTimeValue));

	if (StoppedTimeValue >= MinElapsedTimeForSuccess && StoppedTimeValue <= MaxElapsedTimeForSuccess && PressedCorrectInput)
	{
		Success = true;
		CurrentFailState = EFailureReason::None;
	}
	else
	{
		if (StoppedTimeValue < MinElapsedTimeForSuccess && PressedCorrectInput)
		{
			CurrentFailState = EFailureReason::Early;
		}
		else if (StoppedTimeValue > MaxElapsedTimeForSuccess && PressedCorrectInput)
		{
			CurrentFailState = EFailureReason::Late;
		}
		else
		{
			CurrentFailState = EFailureReason::WrongInput;
			//GEngine->AddOnScreenDebugMessage(-1, 3.f, FColor::Green, "Wrong input");
		}
		
		Success = false;
	}

	OnResultsCalculated();
	return StoppedTimeValue;
}

void UMinigameWidgetBase::EventTimeout()
{
	StopTimer(TimerHandle);
	CurrentFailState = EFailureReason::TimeOut;

	Success = false;
	
	OnResultsCalculated();
	
	//GEngine->AddOnScreenDebugMessage(-1, 3.f, FColor::Green, "Time ran out!");
}

void UMinigameWidgetBase::NativeConstruct()
{
	Super::NativeConstruct();

	PlayerControllerBase = Cast<APlayerControllerBase>(UGameplayStatics::GetPlayerController(this, 0));
}

void UMinigameWidgetBase::NativePreConstruct()
{
	Super::NativePreConstruct();

	StartAngle = (MinElapsedTimeForSuccess / QuickTimeEventDuration) * 360.0f;
}
`}
                        </SyntaxHighlighter>
                        <p className="legend">MinigameWidgetBase.cpp</p>
                    </div>
                    <div className="code-slide">
                        <SyntaxHighlighter
                            language="cpp"
                            style={nightOwl}
                            customStyle={{
                                width: "90%",
                                height: "90%",
                                background: "#1e1e1e",
                                borderRadius: "8px",
                                padding: ".25rem",
                                boxSizing: "border-box",
                                overflow: "auto",
                            }}
                        >
{`// PlayerCharacter.cpp
// Snippet of camera transition system to and from minigames

// Used to allow character to auto-move to minigame location while camera interpolates to minigame position
void APlayerCharacter::PossessAIController()
{
	APlayerStart* PlayerStart = Cast<APlayerStart>(UGameplayStatics::GetActorOfClass(GetWorld(), APlayerStart::StaticClass()));

	// Create a dummy pawn we can possess to allow the character to move via an AI Controller
	if (PlayerStart)
	{
		FRotator PlayerStartRotation = PlayerStart->GetActorRotation();
		PossessedDummyPawn = GetWorld()->SpawnActor<ADummyPawn>(TempPawnToPossess, GetActorTransform());
		PossessedDummyPawn->SetActorRotation(PlayerStartRotation);
		PlayerControllerBase->Possess(PossessedDummyPawn);
	}
	
    // Redundant, but this controller needs to spawn so I'm not taking any chances
	FActorSpawnParameters SpawnParams;
	SpawnParams.SpawnCollisionHandlingOverride = ESpawnActorCollisionHandlingMethod::AlwaysSpawn;

	AAIController* AIController = GetWorld()->SpawnActor<AAIController>(AAIController::StaticClass(), GetActorLocation(), GetActorRotation(), SpawnParams);
	if (AIController)
	{
		AIController->Possess(this);
	}
}

// Used to return control to the player character after forging minigame
void APlayerCharacter::PossessPlayerController(UCommonActivatableWidget* WidgetToRemove)
{
	if (PossessedDummyPawn)
	{
		APlayerStart* PlayerStart = Cast<APlayerStart>(UGameplayStatics::GetActorOfClass(GetWorld(), APlayerStart::StaticClass()));
		
		if (PlayerStart)
		{
			FRotator PlayerStartRotation = PlayerStart->GetActorRotation();
			PlayerControllerBase->isBlendingViewTarget = true;
			PossessedDummyPawn->SetActorLocation(GetActorLocation()); 
			PossessedDummyPawn->SetActorRotation(PlayerStartRotation);
			SetActorRotation(PlayerStartRotation);
			PlayerControllerBase->SetControlRotation(PlayerStartRotation);
			PlayerControllerBase->SetViewTargetWithBlend(this, 1.5, VTBlend_EaseInOut, 4.f);
		 
			FTimerHandle TempHandle;
			GetWorldTimerManager().SetTimer(TempHandle, [this, WidgetToRemove]()
			{
				{
					PlayerControllerBase->isBlendingViewTarget = false;
					PlayerControllerBase->Possess(this);
					PlayerControllerBase->MainWidget->RemoveWidget(WidgetToRemove);
					PlayerControllerBase->MainWidget->SetInputModeMenuClosed();
				
					GetWorldTimerManager().SetTimer(
						CameraRotationTimerHandle,
						this,
						&ThisClass::RotateCameraBackToCenter,
						GetWorld()->GetDeltaSeconds(),
						true
					);
				}
			}, 2.f, false);
		}
	}
}

// Blend view target doesn't always like to return to the original starting location,
// this function forces that to happen
void APlayerCharacter::RotateCameraBackToCenter()
{
	FRotator NewControlRotation = FMath::RInterpTo(
		PlayerControllerBase->GetControlRotation(),
		StartupCameraRotation,
		GetWorld()->GetDeltaSeconds(),
		20);
	PlayerControllerBase->SetControlRotation(NewControlRotation);

	if (PlayerControllerBase->GetControlRotation().IsNearlyZero(3.f))
	{
		GetWorldTimerManager().ClearTimer(CameraRotationTimerHandle);
	}
}
`}
                        </SyntaxHighlighter>
                        <p className="legend">PlayerCharacter.cpp</p>
                    </div>
                    <div className="blueprint-script">
                        <iframe title="OrderGeneration" src="https://blueprintue.com/render/_3tsce9r/" scrolling="no" allowFullScreen></iframe>
                        <p className="legend">Order Generation script on the NPC Character (use full screen on mobile)</p>
                    </div>
                    <div className="blueprint-script">
                        <iframe title="AnvilGraph" src="https://blueprintue.com/render/lj_s3ls4/" scrolling="no" allowFullScreen></iframe>
                        <p className="legend">The anvil's main event graph (use full screen on mobile)</p>
                    </div>
                </Carousel>
                </div>
            </div>


            <div className="project">
                <div className="project-text">
                    <h2>First Person GAS & CommonUI Template</h2>
                    <p> This template has been iterated on several times and acts as an outstanding starting place
                        for a single player first person project. The template boasts several features, but the most useful are 
                        the integration and initialization of GAS, controller support, the save/load system
                        and the extended Common UI classes. The next iteration will support multiplayer projects and include
                        a custom Multiplayer Sessions Plugin that connects clients together via Steam, which I'm working on
                        in my free time.
                    </p>
                    <h3>Key Skills & Features</h3>
                    <ul>
                        <li>Advanced UI Architecture</li>
                        <li>GAS</li>
                        <li>Common UI</li>
                        <li>Controller Support Everywhere</li>
                        <li>Robust Save/Load system</li>
                        <li>Built-In Menu Navbar</li>
                        <li>RPG Attributes including Move & Look Speed</li>
                        <li>Interaction System</li>
                        <li>Independent UI and Gameplay Input Mapping Contexts</li>
                    </ul>
                    <div className="project-buttons">
                        <a 
                            href="https://github.com/pterafier/UltimateGASTemplate"
                            target="_blank" 
                            rel="noreferrer"
                            className="project-btn github-btn"
                        >
                            <GitHubIcon style={{ fontSize: '1.2rem' }} /> View Source Code
                        </a>
                    </div>
                </div>
                
                <div className="project-carousel">
                    <Carousel
                    showThumbs={false}
                    showStatus={false}
                    infiniteLoop
                    autoPlay={false}
                    interval={3000}
                    transitionTime={400}
                    stopOnHover
                    emulateTouch={false}
					swipeable={false}
                    >
                    <div className="code-slide">
                        <SyntaxHighlighter
                            language="cpp"
                            style={nightOwl}
                            customStyle={{
                                width: "90%",
                                height: "90%",
                                background: "#1e1e1e",
                                borderRadius: "8px",
                                padding: ".25rem",
                                boxSizing: "border-box",
                                overflow: "auto",
                            }}
                        >
{`// MainWidget.cpp
// This widget is on-screen permanently (initialized by HUD actor) and has functions 
// to allow widgets to get pushed to different UCommonActivatableWidgetContainerBase stacks

// Main function for adding widgets to the screen. Automatically handles input
UCommonActivatableWidget* UMainWidget::PushWidgetToTargetStack(UCommonActivatableWidgetContainerBase* TargetStack, TSubclassOf<UCommonActivatableWidget> WidgetClass, bool bActivateWidget, bool DisableInput, bool FlushInput)
{
    if (bActivateWidget)
    {
        ActivateWidget();
        PushedWidget = TargetStack->AddWidget(WidgetClass);
        PushedWidget->ActivateWidget();
        SetInputModeMenuOpened(PushedWidget, DisableInput, FlushInput);
    }
    else
    {
        PushedWidget = TargetStack->AddWidget(WidgetClass);
        PushedWidget->ActivateWidget();
    }
    return PushedWidget;
}

void UMainWidget::SetInputModeMenuOpened(UWidget* WidgetToFocus, bool DisableInput, bool FlushInput)
{
    APlayerController* PlayerController = GetWorld()->GetFirstPlayerController();
    ACharacter* PlayerCharacter = UGameplayStatics::GetPlayerCharacter(this, 0);
    FInputModeGameAndUI InputModeGameAndUI;
    
    if (FlushInput)
    {
        PlayerController->FlushPressedKeys();
    }
    
    InputModeGameAndUI.SetLockMouseToViewportBehavior(EMouseLockMode::DoNotLock);
    InputModeGameAndUI.SetHideCursorDuringCapture(false);
    InputModeGameAndUI.SetWidgetToFocus(WidgetToFocus->TakeWidget());
    PlayerController->SetInputMode(InputModeGameAndUI);
    PlayerController->SetShowMouseCursor(true);
    
    if (DisableInput)
    {
        PlayerCharacter->DisableInput(PlayerController);
    }
}

void UMainWidget::SetInputModeMenuClosed()
{
    APlayerController* PlayerController = GetWorld()->GetFirstPlayerController();
    ACharacter* PlayerCharacter = UGameplayStatics::GetPlayerCharacter(this, 0);

    FInputModeGameOnly InputModeGameOnly;
    PlayerController->SetInputMode(InputModeGameOnly);
    PlayerController->SetShowMouseCursor(false);
    PlayerCharacter->EnableInput(PlayerController);
}

void UMainWidget::RemoveWidget(UCommonActivatableWidget* Widget)
{
    Widget->DeactivateWidget();
    float MenuTransitionDuration = Menu_Stack->GetTransitionDuration();

    // Common UI widget stacks come with automatic transitions - this timer
    // is accounting for that
    FTimerHandle TimerHandle;
    GetWorld()->GetTimerManager().SetTimer(
        TimerHandle,
        [this]()
        {
            PushedWidget = Menu_Stack->GetActiveWidget();
        },
        MenuTransitionDuration,
        false
    );
}

void UMainWidget::ClearStacks()
{
    Menu_Stack->ClearWidgets();
    Popup_Stack->ClearWidgets();
    SetInputModeMenuClosed();
    PushedWidget = nullptr;
    OnStacksCleared.Broadcast();
}

void UMainWidget::NativeConstruct()
{
    Super::NativeConstruct();

    PushedWidget = nullptr;
    bAutomaticallyRegisterInputOnConstruction = true;
}

void UMainWidget::NativeTick(const FGeometry& MyGeometry, float InDeltaTime)
{
    Super::NativeTick(MyGeometry, InDeltaTime);
    
    if (PushedWidget == nullptr && StacksCleared == true)
    {
        ClearStacks();
        StacksCleared = false;
    }
    else if (PushedWidget != nullptr)
    {
        StacksCleared = true;
    }
}

// Overridden in menu classes to allow them to handle universal back actions
bool UMainWidget::NativeOnHandleBackAction()
{
    return true;
}
`}
                        </SyntaxHighlighter>
                        <p className="legend">MainWidget.cpp</p>
                    </div>
                    <div className="code-slide">
                        <SyntaxHighlighter
                            language="cpp"
                            style={nightOwl}
                            customStyle={{
                                width: "90%",
                                height: "90%",
                                background: "#1e1e1e",
                                borderRadius: "8px",
                                padding: ".25rem",
                                boxSizing: "border-box",
                                overflow: "auto",
                            }}
                        >
{`// SaveGameSubsystem.cpp
// inherits from UGameInstanceSubsystem

USaveGameSubsystem::USaveGameSubsystem()
{
	SaveGameObject = nullptr;
	SaveSlotName = TEXT("SaveSlot");
	SaveObjectClass = USaveGameObject::StaticClass();
	DoesSaveExist = false;
	SaveObjectInitialized = false;
	CanSave = false;
	isNewSaveGameObject = false;
}

USaveGameSubsystem* USaveGameSubsystem::Get(const UObject* WorldContextObject)
{
	if (!WorldContextObject) return nullptr;

	const UGameInstance* GameInstance = UGameplayStatics::GetGameInstance(WorldContextObject);
	if (!GameInstance) return nullptr;

	return GameInstance->GetSubsystem<USaveGameSubsystem>();
}

void USaveGameSubsystem::SetSaveIndicatorWidgetClass(TSubclassOf<UActivatableWidgetBase> WidgetClass)
{
	SaveIndicatorWidgetClass = WidgetClass;
}

void USaveGameSubsystem::Initialize(FSubsystemCollectionBase& Collection)
{
	Super::Initialize(Collection);

	LoadGameData_Implementation();
}

void USaveGameSubsystem::SetGraphicsSettingsFromSaveData()
{
	FGraphicsSave GraphicsSettings = SaveGameObject->GraphicsData;
	UGameUserSettings* GameUserSettings = UGameUserSettings::GetGameUserSettings();
	
	if (SaveGameObject)
	{
		SetResolution();
		GameUserSettings->SetOverallScalabilityLevel(GraphicsSettings.QualityIndex);
		GameUserSettings->SetFrameRateLimit(GraphicsSettings.FrameLimitIndex);
		GameUserSettings->SetViewDistanceQuality(GraphicsSettings.ViewDistanceIndex);
		GameUserSettings->SetAntiAliasingQuality(GraphicsSettings.AntiAliasingIndex);
		GameUserSettings->SetPostProcessingQuality(GraphicsSettings.PostProcessingIndex);
		GameUserSettings->SetShadowQuality(GraphicsSettings.ShadowsIndex);
		GameUserSettings->SetTextureQuality(GraphicsSettings.TexturesIndex);
		GameUserSettings->SetVisualEffectQuality(GraphicsSettings.EffectsIndex);
		GameUserSettings->SetShadingQuality(GraphicsSettings.ShadingIndex);
		GameUserSettings->SetFoliageQuality(GraphicsSettings.FoliageIndex);
		GameUserSettings->SetReflectionQuality(GraphicsSettings.ReflectionsIndex);
		GameUserSettings->SetGlobalIlluminationQuality(GraphicsSettings.GlobalIlluminationIndex);
		GameUserSettings->ApplyResolutionSettings(false);
		GameUserSettings->ApplySettings(true);
	}
}

void USaveGameSubsystem::SetResolution()
{
	FGraphicsSave GraphicsSettings = SaveGameObject->GraphicsData;
	UGameUserSettings* GameUserSettings = UGameUserSettings::GetGameUserSettings();

	if (isNewSaveGameObject)
	{
		GameUserSettings->SetScreenResolution(GameUserSettings->GetDesktopResolution());
		return;
	}
	
	switch (GraphicsSettings.ResolutionIndex)
	{
	case 0:
		GameUserSettings->SetScreenResolution(FIntPoint(1280, 720));
		break;
	case 1:
		GameUserSettings->SetScreenResolution(FIntPoint(1920, 1080));
		break;
	case 2:
		GameUserSettings->SetScreenResolution(FIntPoint(2560, 1440));
		break;
	case 3:
		GameUserSettings->SetScreenResolution(FIntPoint(3840, 2160));
		break;
	default:
		GameUserSettings->SetScreenResolution(FIntPoint(1920, 1080));
	}
}

USaveGameObject* USaveGameSubsystem::GetSaveGameData_Implementation() const
{
	return SaveGameObject;
}

void USaveGameSubsystem::LoadGameData_Implementation()
{
	// Check if the save game exists
	DoesSaveExist = UGameplayStatics::DoesSaveGameExist(SaveSlotName, 0);

	// If it does, load it asynchronously and bind to the OnGameLoaded delegate
	if (DoesSaveExist)
	{
		isNewSaveGameObject = false;
		FAsyncLoadGameFromSlotDelegate OnGameLoadedDelegate;
		OnGameLoadedDelegate.BindUObject(this, &ThisClass::OnLoadGameCompleted);
		UGameplayStatics::AsyncLoadGameFromSlot(SaveSlotName, 0, OnGameLoadedDelegate);
	}
	// Otherwise, create a new save game object
	else
	{
		isNewSaveGameObject = true;
		USaveGame* NewSaveGameObject = UGameplayStatics::CreateSaveGameObject(SaveObjectClass);
		SaveGameObject = Cast<USaveGameObject>(NewSaveGameObject);
		SaveObjectInitialized = true;
		OnSaveGameObjectLoaded.Broadcast();
		CanSave = true;
	}
}

void USaveGameSubsystem::SaveGameData_Implementation()
{
	PushSaveIndicatorWidget();
	
	FAsyncSaveGameToSlotDelegate OnGameSavedDelegate;
	OnGameSavedDelegate.BindUObject(this, &ThisClass::OnSaveGameCompleted);
	UGameplayStatics::AsyncSaveGameToSlot(SaveGameObject, SaveSlotName, 0, OnGameSavedDelegate);
}

void USaveGameSubsystem::SetPlayerSaveData_Implementation(const FPlayerSave& PlayerData)
{
	SaveGameObject->PlayerData = PlayerData;
}

void USaveGameSubsystem::SetPlayerAttributes_Implementation(const FCharacterAttributes& PlayerAttributes)
{
	SaveGameObject->PlayerAttributes = PlayerAttributes;
}

void USaveGameSubsystem::SetControlsSaveData_Implementation(const FControlsSave& ControlsData)
{
	SaveGameObject->ControlsData = ControlsData;
}

void USaveGameSubsystem::SetGraphicsSaveData_Implementation(const FGraphicsSave& GraphicsData)
{
	SaveGameObject->GraphicsData = GraphicsData;
}

void USaveGameSubsystem::SetAudioSettingsSaveData_Implementation(const FAudioSave& AudioData)
{
	SaveGameObject->AudioData = AudioData;
}

void USaveGameSubsystem::OnSaveGameCompleted(const FString& SlotName, const int32 UserIndex, bool bSuccess)
{
	if (SaveIndicatorWidget)
	{
		APlayerControllerBase* ArsenicPlayerController = Cast<APlayerControllerBase>(UGameplayStatics::GetPlayerController(GetWorld(), 0));
		UMainWidget* ArsenicMainWidget = ArsenicPlayerController->MainWidget;
		
		ArsenicMainWidget->RemoveWidget(SaveIndicatorWidget);
		//GEngine->AddOnScreenDebugMessage(-1, 10, FColor::Cyan, TEXT("USaveGameSubsystem: SaveIndicatorWidget Popped"));
	}
}

void USaveGameSubsystem::OnLoadGameCompleted(const FString& SlotName, const int32 UserIndex, USaveGame* LoadedSaveGameObject)
{
	SaveGameObject = Cast<USaveGameObject>(LoadedSaveGameObject);

	if (!SaveGameObject)
	{
		GEngine->AddOnScreenDebugMessage(
			-1,
			10,
			FColor::Red,
			TEXT("USaveGameSubsystem: Loading save game data failed, creating new save game object...")
		);
		isNewSaveGameObject = true;
		USaveGame* NewSaveGameObject = UGameplayStatics::CreateSaveGameObject(SaveObjectClass);
		SaveGameObject = Cast<USaveGameObject>(NewSaveGameObject);
	}
	
	SaveObjectInitialized = true;
	OnSaveGameObjectLoaded.Broadcast();
	CanSave = true;
}

void USaveGameSubsystem::PushSaveIndicatorWidget()
{
	check(SaveIndicatorWidgetClass);
	
	APlayerControllerBase* PlayerController = Cast<APlayerControllerBase>(UGameplayStatics::GetPlayerController(GetWorld(), 0));
	UMainWidget* MainWidget = PlayerController->MainWidget;
	UCommonActivatableWidgetContainerBase* PopupStack = MainWidget->Popup_Stack;

	SaveIndicatorWidget = MainWidget->PushWidgetToTargetStack(PopupStack, SaveIndicatorWidgetClass, false, false);
	//GEngine->AddOnScreenDebugMessage(-1, 10, FColor::Cyan, TEXT("USaveGameSubsystem: SaveIndicatorWidget Pushed"));
}
`}
                        </SyntaxHighlighter>
                        <p className="legend">SaveGameSubsystem.cpp</p>
                    </div>
                    <div className="code-slide">
                        <SyntaxHighlighter
                            language="cpp"
                            style={nightOwl}
                            customStyle={{
                                width: "90%",
                                height: "90%",
                                background: "#1e1e1e",
                                borderRadius: "8px",
                                padding: ".25rem",
                                boxSizing: "border-box",
                                overflow: "auto",
                            }}
                        >
{`// PlayerCharacter.cpp
// Showcases interaction system among other things

APlayerCharacter::APlayerCharacter()
{
	Camera = CreateDefaultSubobject<UCameraComponent>("Camera");
	Camera->SetupAttachment(GetMesh());

	InteractDistance = 500.f;
}

void APlayerCharacter::PossessedBy(AController* NewController)
{
	Super::PossessedBy(NewController);
	
	SetPlayerReferences(NewController);
	InitAbilityActorInfo();
}

FCharacterAttributes APlayerCharacter::GetAttributesSaveData()
{
	FCharacterAttributes PlayerAttributes;
	UAbilitySystemComponent* ASC = GetAbilitySystemComponent();

	PlayerAttributes.MaxHealth = ASC->GetNumericAttribute(UAttributeSetBase::GetMaxHealthAttribute());
	PlayerAttributes.Health = ASC->GetNumericAttribute(UAttributeSetBase::GetHealthAttribute());
	PlayerAttributes.Strength = ASC->GetNumericAttribute(UAttributeSetBase::GetStrengthAttribute());
	PlayerAttributes.MaxStrength = ASC->GetNumericAttribute(UAttributeSetBase::GetMaxStrengthAttribute());
	PlayerAttributes.HealthRegen = ASC->GetNumericAttribute(UAttributeSetBase::GetHealthRegenAttribute());
	PlayerAttributes.HealthRegenRate = ASC->GetNumericAttribute(UAttributeSetBase::GetHealthRegenRateAttribute());
	PlayerAttributes.PhysicalResistance = ASC->GetNumericAttribute(UAttributeSetBase::GetPhysicalResistanceAttribute());
	PlayerAttributes.MagicResistance = ASC->GetNumericAttribute(UAttributeSetBase::GetMagicResistanceAttribute());
	PlayerAttributes.WalkSpeed = ASC->GetNumericAttribute(UAttributeSetBase::GetWalkSpeedAttribute());
	PlayerAttributes.MaxWalkSpeed = ASC->GetNumericAttribute(UAttributeSetBase::GetMaxWalkSpeedAttribute());
	PlayerAttributes.SprintSpeed = ASC->GetNumericAttribute(UAttributeSetBase::GetSprintSpeedAttribute());
	PlayerAttributes.MaxSprintSpeed = ASC->GetNumericAttribute(UAttributeSetBase::GetMaxSprintSpeedAttribute());
	PlayerAttributes.LookSpeed = ASC->GetNumericAttribute(UAttributeSetBase::GetLookSpeedAttribute());
	PlayerAttributes.BaseMaxHealth = ASC->GetNumericAttribute(UAttributeSetBase::GetBaseMaxHealthAttribute());
	PlayerAttributes.BaseHealth = ASC->GetNumericAttribute(UAttributeSetBase::GetBaseHealthAttribute());
	PlayerAttributes.BaseMaxStrength = ASC->GetNumericAttribute(UAttributeSetBase::GetBaseMaxStrengthAttribute());
	PlayerAttributes.BaseStrength = ASC->GetNumericAttribute(UAttributeSetBase::GetBaseStrengthAttribute());
	PlayerAttributes.BasePhysicalResistance = ASC->GetNumericAttribute(UAttributeSetBase::GetBasePhysicalResistanceAttribute());
	PlayerAttributes.BaseMagicResistance = ASC->GetNumericAttribute(UAttributeSetBase::GetBaseMagicResistanceAttribute());
	PlayerAttributes.BaseHealthRegen = ASC->GetNumericAttribute(UAttributeSetBase::GetBaseHealthRegenAttribute());
    PlayerAttributes.BaseHealthRegenRate = ASC->GetNumericAttribute(UAttributeSetBase::GetBaseHealthRegenRateAttribute());
	PlayerAttributes.BaseLookSpeed = ASC->GetNumericAttribute(UAttributeSetBase::GetBaseLookSpeedAttribute());
	PlayerAttributes.BaseMaxSprintSpeed = ASC->GetNumericAttribute(UAttributeSetBase::GetBaseMaxSprintSpeedAttribute());
	PlayerAttributes.BaseSprintSpeed = ASC->GetNumericAttribute(UAttributeSetBase::GetBaseSprintSpeedAttribute());
	PlayerAttributes.BaseMaxWalkSpeed = ASC->GetNumericAttribute(UAttributeSetBase::GetBaseMaxWalkSpeedAttribute());
	PlayerAttributes.BaseWalkSpeed = ASC->GetNumericAttribute(UAttributeSetBase::GetBaseWalkSpeedAttribute());
	
	return PlayerAttributes;
}

void APlayerCharacter::Interact()
{
	if (LookAtActor == nullptr) return;
	
	if (LookAtActor->GetClass()->ImplementsInterface(UInteractInterface::StaticClass()))
	{
		IInteractInterface::Execute_Interact(LookAtActor);
	}
}

void APlayerCharacter::InteractTrace()
{
	AActor* HitActor = PerformInteractLineTrace();

	if (HitActor == LookAtActor) return;

	if (HitActor && HitActor->GetClass()->ImplementsInterface(UInteractInterface::StaticClass()))
	{
		LookAtActor = HitActor;
		OnPlayerLookAt.Broadcast(HitActor);
		IInteractInterface::Execute_LookAt(HitActor);
	}
	else
	{
		LookAtActor = nullptr;
	}

}

// helper function to keep InteractTrace clean. Could parameterize this
// and put it in a blueprint function library later for reusability
AActor* APlayerCharacter::PerformInteractLineTrace()
{
	FVector TraceStart = Camera->GetComponentLocation();
	FVector TraceEnd = TraceStart + (Camera->GetForwardVector() * InteractDistance);

	FHitResult HitResult;
	FCollisionQueryParams CollisionParams;
	CollisionParams.AddIgnoredActor(this);

	bool bHit = GetWorld()->LineTraceSingleByChannel(HitResult, TraceStart, TraceEnd, ECC_Visibility, CollisionParams);

	return (bHit && HitResult.IsValidBlockingHit() && HitResult.GetActor()) ? HitResult.GetActor() : nullptr;
}

void APlayerCharacter::Tick(float DeltaTime)
{
	Super::Tick(DeltaTime);

	InteractTrace();
}

void APlayerCharacter::BeginPlay()
{
	Super::BeginPlay();

	AddStartupAbilities();
}

void APlayerCharacter::AddStartupAbilities()
{
	UAbilitySystemComponentBase* ASC = CastChecked<UAbilitySystemComponentBase>(AbilitySystemComponent);
	ASC->AddStartupAbilities(StartupAbilities);
}

void APlayerCharacter::InitAbilityActorInfo()
{
	check(PlayerStateBase);
	AbilitySystemComponent = PlayerStateBase->GetAbilitySystemComponent();
	AttributeSet = PlayerStateBase->GetAttributeSet();
	AbilitySystemComponent->InitAbilityActorInfo(PlayerStateBase, this);
	
	Cast<UAbilitySystemComponentBase>(PlayerStateBase->GetAbilitySystemComponent())->AbilityActorInfoSet(); // Inform the ASC that the character is initialized
	
}

void APlayerCharacter::SetPlayerReferences(AController* NewController)
{
	PlayerControllerBase = Cast<APlayerControllerBase>(NewController);
	PlayerStateBase = GetPlayerState<APlayerStateBase>();
	
	check(PlayerControllerBase);
	check(PlayerStateBase);
}

`}
                        </SyntaxHighlighter>
                        <p className="legend">PlayerCharacter.cpp</p>
                    </div>
                    <div className="code-slide">
                        <SyntaxHighlighter
                            language="cpp"
                            style={nightOwl}
                            customStyle={{
                                width: "90%",
                                height: "90%",
                                background: "#1e1e1e",
                                borderRadius: "8px",
                                padding: ".25rem",
                                boxSizing: "border-box",
                                overflow: "auto",
                            }}
                        >
{`// Checkpoint.cpp
// Simple showcase of how to save with an overlap box

ACheckpoint::ACheckpoint()
{
	PrimaryActorTick.bCanEverTick = true;

	TriggerBox = CreateDefaultSubobject<UBoxComponent>("TriggerBox");
	TriggerBox->SetupAttachment(GetRootComponent());
}

void ACheckpoint::BeginPlay()
{
	Super::BeginPlay();

	TriggerBox->OnComponentBeginOverlap.AddDynamic(this, &ThisClass::OnTriggerBoxBeginOverlap);
}

void ACheckpoint::EndPlay(const EEndPlayReason::Type EndPlayReason)
{
	Super::EndPlay(EndPlayReason);

	TriggerBox->OnComponentBeginOverlap.RemoveDynamic(this, &ThisClass::OnTriggerBoxBeginOverlap);
}

void ACheckpoint::OnTriggerBoxBeginOverlap(UPrimitiveComponent* OverlappedComponent, AActor* OtherActor, UPrimitiveComponent* OtherComp, int32 OtherBodyIndex, bool bFromSweep, const FHitResult& SweepResult)
{
	if (OtherActor != UGameplayStatics::GetPlayerCharacter(this, 0)) return;
	
	USaveGameSubsystem* SaveSubsystem = USaveGameSubsystem::Get(this);
	if (!SaveSubsystem) return;
	if (!SaveSubsystem->CanSave) return; // helps prevent an unintentional save when the player transform is updated at begin play
	
	ISaveGameInterface* SaveGameInterface = SaveSubsystem;
	FetchSaveData();
	SaveGameInterface->Execute_SetPlayerSaveData(SaveSubsystem, PlayerSaveData);
	SaveGameInterface->Execute_SetPlayerAttributes(SaveSubsystem, PlayerAttributes);
	SaveGameInterface->Execute_SaveGameData(SaveSubsystem);
}

void ACheckpoint::FetchSaveData()
{
	APlayerStateBase* ArsenicPlayerState = Cast<APlayerStateBase>(UGameplayStatics::GetPlayerState(this, 0));
	APlayerCharacter* ArsenicPlayerCharacter = Cast<APlayerCharacter>(UGameplayStatics::GetPlayerCharacter(this, 0));
	PlayerSaveData = ArsenicPlayerState->GetPlayerSaveData();
	PlayerAttributes = ArsenicPlayerCharacter->GetAttributesSaveData();
}
`}
                        </SyntaxHighlighter>
                        <p className="legend">Checkpoint.cpp</p>
                    </div>
                    <div className="code-slide">
                        <SyntaxHighlighter
                            language="cpp"
                            style={nightOwl}
                            customStyle={{
                                width: "90%",
                                height: "90%",
                                background: "#1e1e1e",
                                borderRadius: "8px",
                                padding: ".25rem",
                                boxSizing: "border-box",
                                overflow: "auto",
                            }}
                        >
{`// NavBarBase.cpp
// Convenient navbar that can be placed on menus that give them 
// navigation icons that update with the player's input device
// (mouse & keyboard or gamepad), and an included back button

// Triggered with included back button (pictured on next slide)
void UNavBarBase::RemoveParentWidget()
{
	APlayerController* PlayerController = UGameplayStatics::GetPlayerController(this, 0);
	APlayerHUD* PlayerHUD = Cast<APlayerHUD>(PlayerController->GetHUD());
	UMenuBase* ParentWidget = GetTypedOuter<UMenuBase>();
	UMainWidget* MainWidget = PlayerHUD->MainWidget;

	if (ParentWidget && MainWidget)
	{
		MainWidget->RemoveWidget(ParentWidget);
	}
	else
	{
		UE_LOG(LogTemp, Error, TEXT("UNavBarBase: ParentWidget or MainWidget is null, could not activate back action"));
	}
}
`}
                        </SyntaxHighlighter>
                        <p className="legend">NavBarBase.cpp</p>
                    </div>
                    <div className="blueprint-script">
                        <img src={Navbar} alt="Navbar"></img>
                        <p className="legend">Navbar showcase</p>
                    </div>
                </Carousel>
                </div>
            </div>

            

            {/* Example: Project with Image */}
            <div className="project">
                <div className="project-text">
                    <h2>Glyphweaver</h2>
                    <p>Glyphweaver is an action adventure game about discovering the secrets
                        of a lost civilization. Created in 30 days using Unreal Engine for the 2024 annual Github
                        Gameoff Game jam (November), I worked as the lead programmer amongst a small team.
                        My role was an important one here, as I guided other programmers when
                        they needed help, while designing and programming the
                        systems required for this project. I designed and programmed the combat
                        system from the ground up, including a Doom-like token system to ensure
                        the player doesn't get overwhelmed or swarmed by enemies. I created 8 unique
                        spells and utilized the Environment Query System to create complex AI
                        behavior with varying enemy types to keep combat challenging and interesting.
                        This was the project where I got really comfortable in C++.
                        I also designed the UI and accompanying Save/Load system.
                        Please note that while the GitHub link below doesn't link to my personal
                        GitHub page, it is still the exact project I worked on minus the marketplace
                        assets we used to complete the project.
                    </p>
                    <h3>Key Skills & Features</h3>
                    <ul>
                        <li>Teamwork</li>
                        <li>Combat Design (and a cool final boss)</li>
                        <li>Systems Design</li>
                        <li>Game Balancing</li>
                        <li>Saving and Loading</li>
                        <li>C++</li>
                        <li>Environment Query System</li>
                        <li>Complex AI Behavior trees</li>
                        <li>Custom ability system</li>
                        <li>Basic IT/Repo Management</li>
                        <li>Subversion Version Control</li>
                    </ul>
                    <div className="project-buttons">
                        <a 
                            href="https://github.com/JoelAbe/GameOff2024Github"
                            target="_blank" 
                            rel="noreferrer"
                            className="project-btn github-btn"
                        >
                            <GitHubIcon style={{ fontSize: '1.2rem' }} /> View Source Code
                        </a>

                        <a 
                            href="https://veeyuh.itch.io/glyphweaver" 
                            target="_blank" 
                            rel="noreferrer"
                            className="project-btn itch-btn"
                        >
                            <img 
                            src={itchIcon} 
                            alt="Itch.io"
                            className="itch-icon"
                            style={{ width: '1.2rem', height: '1.2rem' }}
                            /> 
                            Play on Itch.io
                        </a>
                    </div>
                </div>

                <div className="project-carousel">
                    <Carousel
                    showThumbs={false}
                    showStatus={false}
                    infiniteLoop
                    autoPlay={false}
                    interval={3000}
                    transitionTime={400}
                    stopOnHover
                    emulateTouch={false}
					swipeable={false}
                    >
                    <div className="video-wrapper">
                        <ReactPlayer 
                            src="https://youtu.be/-xw7U7qGOuA"
                            width="100%"
                            height="100%"
                            controls
                            playing={true}
                            muted={true}
                        />
                    </div>
                    <div className="code-slide">
                        <SyntaxHighlighter
                            language="cpp"
                            style={nightOwl}
                            customStyle={{
                                width: "90%",
                                height: "90%",
                                background: "#1e1e1e",
                                borderRadius: "8px",
                                padding: ".25rem",
                                boxSizing: "border-box",
                                overflow: "auto",
                            }}
                        >
{`// NPCBaseCharacter.cpp
// The entire baseNPC class - requests combat tokens, transitions states, handles stunning
// and super armor, among other things. NPCs are spawned in, not placed

ANPCBaseCharacter::ANPCBaseCharacter()
{
	PrimaryActorTick.bCanEverTick = true;

	CharacterAttributes = CreateDefaultSubobject<UAttributesComponent>(TEXT("Character Attributes"));

	// Initialize variables
	isRanged = true;
	hasCombatToken = false;
	BaseDamage = 10.f;
	hasSuperArmor = false;
	isDead = false;
	DamageRequiredToBreakSuperArmor = 50.f;
	TimeToBreakSuperArmor = 5.f;
	AccumulatedDamage = 0.f;
	DefaultWalkSpeed = 400.f;
	isSlowed = false;
}

void ANPCBaseCharacter::BeginPlay()
{
	Super::BeginPlay();
	
	SetReferences();

	if (AIController && PlayerCharacter)
	{
		AIController->GetBlackboardComponent()->SetValueAsObject(FName("AttackTarget"), PlayerCharacter);
		//GEngine->AddOnScreenDebugMessage(-1, 10, FColor::Red, TEXT("AI Controller, blackboard component, and player character set"));
	}

	OnTakeAnyDamage.AddDynamic(this, &ANPCBaseCharacter::TakeDamage);
}

void ANPCBaseCharacter::SetReferences()
{
	AActor* FoundCombatManager = UGameplayStatics::GetActorOfClass(this, ACombatManager::StaticClass());
	CombatManager = Cast<ACombatManager>(FoundCombatManager);

	AIController = Cast<AAIControllerBase>(GetController());

	PlayerCharacter = Cast<AJamPlayerCharacter>(UGameplayStatics::GetPlayerCharacter(this, 0));
}

void ANPCBaseCharacter::RequestToken()
{
	if (!CombatManager) return;
	if (hasCombatToken) return;

	CombatManager->ManageTokenRequest(this);
}

void ANPCBaseCharacter::OnTokenRequestApproved()
{
	hasCombatToken = true;

	if (!AIController) return;
	AIController->GetBlackboardComponent()->SetValueAsBool(FName("CanAttack"), true);
}

void ANPCBaseCharacter::OnTokenRequestDenied()
{
	hasCombatToken = false;

	if (!AIController) return;
	AIController->GetBlackboardComponent()->SetValueAsBool(FName("CanAttack"), false);
}

void ANPCBaseCharacter::StartAttack()
{
	SetStateAttacking();
}

void ANPCBaseCharacter::SetStateAttacking()
{
	uint8 Attacking = static_cast<uint8>(ECombatState::Attacking);

	CombatState = ECombatState::Attacking;
	if (AIController)
	{
		AIController->GetBlackboardComponent()->SetValueAsEnum(FName("CombatState"), Attacking);
	}
	else
	{
		//GEngine->AddOnScreenDebugMessage(-1, 10, FColor::Red, TEXT("AI Controller and blackboard component NOT set"));
	}
}

void ANPCBaseCharacter::SetStateMoving()
{
	uint8 Moving = static_cast<uint8>(ECombatState::Moving);

	CombatState = ECombatState::Moving;
	if (AIController)
	{
		AIController->GetBlackboardComponent()->SetValueAsEnum(FName("CombatState"), Moving);
	}
}

void ANPCBaseCharacter::SetStateTaunting()
{
	uint8 Taunting = static_cast<uint8>(ECombatState::Taunting);

	CombatState = ECombatState::Taunting;
	if (AIController)
	{
		AIController->GetBlackboardComponent()->SetValueAsEnum(FName("CombatState"), Taunting);
	}

	OnTaunt(); // Call the blueprint implementable event
}

void ANPCBaseCharacter::SetStateReadyToAttack()
{
	uint8 ReadyToAttack = static_cast<uint8>(ECombatState::ReadyToAttack);

	CombatState = ECombatState::ReadyToAttack;
	if (AIController)
	{
		AIController->GetBlackboardComponent()->SetValueAsEnum(FName("CombatState"), ReadyToAttack);
	}
}

void ANPCBaseCharacter::SetStateWaiting()
{
	uint8 Waiting = static_cast<uint8>(ECombatState::Waiting);

	CombatState = ECombatState::Waiting;
	if (AIController)
	{
		AIController->GetBlackboardComponent()->SetValueAsEnum(FName("CombatState"), Waiting);
	}
}

void ANPCBaseCharacter::SetStateDead()
{
	uint8 Dead = static_cast<uint8>(ECombatState::Dead);

	CombatState = ECombatState::Dead;
	if (AIController)
	{
		AIController->GetBlackboardComponent()->SetValueAsEnum(FName("CombatState"), Dead);
		AIController->GetBlackboardComponent()->SetValueAsBool(FName("CanAttack"), false);
	}
}

void ANPCBaseCharacter::SetStateStunned()
{
	if (hasCombatToken)
	{
		OnTokenRequestDenied();
		CombatManager->PutTokenOnCooldown(ClassType);
	}

	uint8 Stunned = static_cast<uint8>(ECombatState::Stunned);

	CombatState = ECombatState::Stunned;
	if (AIController)
	{
		AIController->GetBlackboardComponent()->SetValueAsEnum(FName("CombatState"), Stunned);
	}
}

void ANPCBaseCharacter::FinishAttacking()
{
	CombatManager->PutTokenOnCooldown(ClassType);
	//GEngine->AddOnScreenDebugMessage(-1, 10, FColor::Cyan, TEXT("AI called FinishAttacking()"));

	hasCombatToken = false;

	if (AIController)
	{
		AIController->GetBlackboardComponent()->SetValueAsBool(FName("CanAttack"), false);
	}

	if (CanSeePlayer() && isRanged)
	{
		SetStateReadyToAttack();
	}
	else
	{
		AssignNextAction();
	}
}

void ANPCBaseCharacter::AssignNextAction()
{
	if (isRanged) 
	{
		int RandomChoice = UKismetMathLibrary::RandomIntegerInRange(1, 5);
		if (RandomChoice == 1 && CombatState != ECombatState::Waiting)
		{
			SetStateWaiting();
		}
		else if (RandomChoice == 2 && CombatState != ECombatState::Taunting)
		{
			SetStateTaunting();
		}
		else
		{
			SetStateMoving();
		}
	}
	else
	{
		SetStateMoving();
	}
}

void ANPCBaseCharacter::Die()
{
	if (isDead) return;

	isDead = true;

	if (hasCombatToken)
	{
		OnTokenRequestDenied();
		CombatManager->PutTokenOnCooldown(ClassType);
	}

	OnNPCDeath.Broadcast();
	SetStateDead();
	OnDeath(); // call the blueprint implementable event
}

void ANPCBaseCharacter::TryStun()
{
	if (hasSuperArmor || CombatState == ECombatState::Stunned || CanBeStunned) return;

	int RandomChoice = UKismetMathLibrary::RandomIntegerInRange(1, 10);

	switch (ClassType)
	{
	case EClassType::Light:
		if (RandomChoice <= 5)
		{
			SetStateStunned();
			StartStunCooldown();
		}
		break;
	case EClassType::Medium:
		if (RandomChoice <= 2)
		{
			SetStateStunned();
			StartStunCooldown();
		}
		break;
	case EClassType::Heavy:
		if (RandomChoice == 1)
		{
			SetStateStunned();
			StartStunCooldown();
		}
		break;
	}

}

void ANPCBaseCharacter::ResetAccumulatedDamage()
{
	AccumulatedDamage = 0.f;
	hasSuperArmor = true;

	GEngine->AddOnScreenDebugMessage(-1, 10, FColor::Red, TEXT("Super armor DPS check not met, accumulated damage has been reset"));
}

void ANPCBaseCharacter::TakeDamage(AActor* DamagedActor, float Damage, const UDamageType* DamageType, AController* InstigatedBy, AActor* DamageCauser)
{
	if (DamagedActor != this) return;

	// Do a DPS check - if the player can deal enough damage within the amount of time specified in TimeToBreakSuperArmor, then we have broken the super armor and have a chance to stun
	// Otherwise, reset AccumulatedDamage and let the timer clear itself. 
	if (!GetWorldTimerManager().IsTimerActive(SuperArmorTimerHandle) && hasSuperArmor)
	{
		GetWorld()->GetTimerManager().SetTimer(SuperArmorTimerHandle, this, &ANPCBaseCharacter::ResetAccumulatedDamage, TimeToBreakSuperArmor);

		GEngine->AddOnScreenDebugMessage(-1, 3, FColor::Yellow, TEXT("New super armor DPS check timer set"));
	}

	if (hasSuperArmor)
	{
		AccumulatedDamage += Damage;
		if (AccumulatedDamage >= DamageRequiredToBreakSuperArmor)
		{
			hasSuperArmor = false;
			CharacterAttributes->RemoveHealth(Damage);
			TryStun();
			GetWorld()->GetTimerManager().ClearTimer(SuperArmorTimerHandle);

			OnSuperArmorBroken(); // call the blueprint event so we can play WWise sound here

			//GEngine->AddOnScreenDebugMessage(-1, 10, FColor::Yellow, TEXT("Super armor broken!"));
		}
		else
		{
			CharacterAttributes->RemoveHealth(Damage / 2);
		}
	}
	else
	{
		// Don't have super armor, treat damage like a normal NPC
		CharacterAttributes->RemoveHealth(Damage);
		TryStun();
	}

	if (CharacterAttributes->GetCurrentHealth() <= 0)
	{
		Die();
	}

	if (CombatState != ECombatState::Attacking && CombatState != ECombatState::Dead)
	{
		GetMesh()->GetAnimInstance()->Montage_Play(HitMontage);
	}
	
	OnDamageReceieved(); // Call the blueprint implementable event
}

void ANPCBaseCharacter::EndSlow()
{
	if (!isSlowed) return;

	isSlowed = false;

	GetCharacterMovement()->MaxWalkSpeed = DefaultWalkSpeed;
	GetMesh()->SetPlayRate(1);
}

void ANPCBaseCharacter::StartSlow()
{
	if (isSlowed) return;

	isSlowed = true;

	GetCharacterMovement()->MaxWalkSpeed = DefaultWalkSpeed / 2;
	GetMesh()->SetPlayRate(0.5);
}

void ANPCBaseCharacter::JumpToDestination(FVector Destination)
{
	FVector LaunchVelocity;
	Destination.Z += 400;

	UGameplayStatics::SuggestProjectileVelocity_CustomArc(this, LaunchVelocity, GetActorLocation(), Destination);

	LaunchCharacter(LaunchVelocity, true, true);
}

bool ANPCBaseCharacter::CanSeePlayer()
{
	FHitResult HitResult;
	FCollisionQueryParams QueryParams;
	QueryParams.AddIgnoredActor(this);
	bool CanSeePlayer = false;

	bool Hit = GetWorld()->LineTraceSingleByChannel(
		HitResult, 
		GetActorLocation(), 
		PlayerCharacter->GetActorLocation(), 
		ECollisionChannel::ECC_Visibility, 
		QueryParams
	);

	if (Hit && HitResult.GetActor() == PlayerCharacter)
	{
		if (AIController)
		{
			AIController->GetBlackboardComponent()->SetValueAsBool(FName("CanSeePlayer"), true);
		}
		CanSeePlayer = true;
	}
	else
	{
		if (AIController)
		{
			AIController->GetBlackboardComponent()->SetValueAsBool(FName("CanSeePlayer"), false);
		}
		CanSeePlayer = false;
	}

	return CanSeePlayer;
}

void ANPCBaseCharacter::StartStunCooldown()
{
	CanBeStunned = false;

	// Set a timer to reset the flag after 2 seconds
	GetWorldTimerManager().SetTimer(StunCooldownTimer, this, &ANPCBaseCharacter::ResetStunCooldown, 2.0f, false);
}

void ANPCBaseCharacter::ResetStunCooldown()
{
	CanBeStunned = true;
}

`}
                        </SyntaxHighlighter>
                        <p className="legend">NPCBaseCharacter.cpp</p>
                    </div>
                    <div className="blueprint-script">
                        <iframe title="CharacterGraph" src="https://blueprintue.com/render/yrsr0na7/" scrolling="no" allowFullScreen></iframe>
                        <p className="legend">The entire character event graph. (use full screen on mobile)</p>
                    </div>
                    <div className="code-slide">
                        <SyntaxHighlighter
                            language="cpp"
                            style={nightOwl}
                            customStyle={{
                                width: "90%",
                                height: "90%",
                                background: "#1e1e1e",
                                borderRadius: "8px",
                                padding: ".25rem",
                                boxSizing: "border-box",
                                overflow: "auto",
                            }}
                        >
{`// CombatManager.cpp
// Manages combat tokens for NPCs. A combat manager is placed in every combat room

ACombatManager::ACombatManager()
{
	PrimaryActorTick.bCanEverTick = false;

	LightTokensAvailable = 0;
	MaxLightTokens = 3;
	LightToken = EClassType::Light;
	MediumTokensAvailable = 0;
	MaxMediumTokens = 2;
	MediumToken = EClassType::Medium;
	HeavyTokensAvailable = 0;
	MaxHeavyTokens = 2;
	HeavyToken = EClassType::Heavy;
	TokenCooldownDuration = 3.f;
}

void ACombatManager::BeginPlay()
{
	Super::BeginPlay();
	
	InitializeTokenValues();
}

void ACombatManager::InitializeTokenValues()
{
	LightTokensAvailable = MaxLightTokens;
	MediumTokensAvailable = MaxMediumTokens;
	HeavyTokensAvailable = MaxHeavyTokens;
}

int ACombatManager::GetAvailableTokensByType(EClassType ClassType)
{
	switch (ClassType)
	{
        case EClassType::Light:
            return LightTokensAvailable;
            break;
        case EClassType::Medium:
            return MediumTokensAvailable;
            break;
        case EClassType::Heavy:
            return HeavyTokensAvailable;
            break;
	}
	return -1;
}

void ACombatManager::RemoveTokenByType(EClassType ClassType)
{
	switch (ClassType)
	{
        case EClassType::Light:
            LightTokensAvailable--;
            break;
        case EClassType::Medium:
            MediumTokensAvailable--;
            break;
        case EClassType::Heavy:
            HeavyTokensAvailable--;
            break;
	}
}

void ACombatManager::TakeTokenOffCooldown()
{
	for (TPair<EClassType, int32>& Pair : TokensOnCooldown)
	{
		if (Pair.Value > 0)
		{
			Pair.Value--;
			UE_LOG(LogTemp, Warning, TEXT("Token cooldown expired. %s now has %d tokens on cooldown."),
				*UEnum::GetValueAsString(Pair.Key), Pair.Value);

			switch (Pair.Key)
			{
                case EClassType::Light:
                    LightTokensAvailable++;
                    break;
                case EClassType::Medium:
                    MediumTokensAvailable++;
                    break;
                case EClassType::Heavy:
                    HeavyTokensAvailable++;
                    break;
			}

			break;
		}
	}
}

void ACombatManager::PutTokenOnCooldown(EClassType ClassType)
{
	if (TokensOnCooldown.Contains(ClassType))
	{
		TokensOnCooldown[ClassType]++;
	}
	else
	{
		TokensOnCooldown.Add(ClassType, 1);
	}

	UE_LOG(LogTemp, Warning, TEXT("Added token to cooldown. %s now has %d tokens on cooldown."),
		*UEnum::GetValueAsString(ClassType), TokensOnCooldown[ClassType]);

	FTimerHandle NewTimerHandle;
	GetWorldTimerManager().SetTimer(NewTimerHandle, this, &ThisClass::TakeTokenOffCooldown, TokenCooldownDuration, false, static_cast<float>(ClassType));
}

void ACombatManager::ManageTokenRequest(ANPCBaseCharacter* NPC)
{
	// Get the NPC class type and check how many tokens are available of that type
	EClassType NPCType = NPC->GetClassType();
	int AvailableTokens = GetAvailableTokensByType(NPCType);

	if (AvailableTokens <= 0)
	{
		NPC->OnTokenRequestDenied();
	}
	else
	{
		NPC->OnTokenRequestApproved();
		RemoveTokenByType(NPCType);
	}
}
`}
                        </SyntaxHighlighter>
                        <p className="legend">CombatManager.cpp</p>
                    </div>
                    
                    <div className="blueprint-script">
                        <iframe title="CaveTroll" src="https://blueprintue.com/render/cgt22q3u/" scrolling="no" allowFullScreen></iframe>
                        <p className="legend">The Cave Troll's (final boss) event graph (use full screen on mobile)</p>
                    </div>
                </Carousel>
                </div>
            </div> 

            
            <div className="project">
                <div className="project-text">
                    <h2>Mangaka Simulator (Client Prototype)</h2>
                    <p> Mangaka Simulator is a relaxing isometric prototype about creating manga. This prototype
                        was created in a couple of weeks or so for a Fiverr client. This is the first professional
                        project where I used GAS and was very thankful for it because each workstation and consumable drains
                        and gains various skills and attributes in different ways, which GAS makes very easy. The game was
                        designed entirely by the client with pretty clear concepts and images from another mangaka simulator.
                        I worked with the client closely to find asset packs that worked for the environment they wanted, and
                        communicated progress with them through each stage of development. When critiques were given, changes
                        were quickly made to address every complaint. The client wanted to continue developing the game after
                        I created the prototype, so I provided video documentation of how the project was set up, where to find
                        everything, and my suggested next steps. Even though this is just a simple prototype, I often
                        find myself thinking about the project. Unfortunately, you can't play this one because it's a client's
                        game, but I can showcase some project details here.
                    </p>
                    <h3>Key Skills & Features</h3>
                    <ul>
                        <li>Gameplay implementation from an outside designer</li>
                        <li>GAS</li>
                        <li>Top-Down mechanics</li>
                        <li>Companion AI</li>
                        <li>Skills and Consumables</li>
                        <li>Time of Day</li>
                        <li>Entering and Exiting Workstations via Animation</li>
                        <li>C++ and Blueprint Programming</li>
                        <li>Inheritance</li>
                        <li>Version Control</li>
                    </ul>
                </div>
                
                <div className="project-carousel">
                    <Carousel
                    showThumbs={false}
                    showStatus={false}
                    infiniteLoop
                    autoPlay={false}
                    interval={3000}
                    transitionTime={400}
                    stopOnHover
                    emulateTouch={false}
					swipeable={false}
                    >
                    <div className="video-wrapper">
                        <ReactPlayer 
                            src="https://youtu.be/OvJfoBpsva0"
                            width="100%"
                            height="100%"
                            controls
                            playing={true}
                            muted={true}
                        />
                    </div>
                    <div className="code-slide">
                        <SyntaxHighlighter
                            language="cpp"
                            style={nightOwl}
                            customStyle={{
                                width: "90%",
                                height: "90%",
                                background: "#1e1e1e",
                                borderRadius: "8px",
                                padding: ".25rem",
                                boxSizing: "border-box",
                                overflow: "auto",
                            }}
                        >
{`// MangakaPlayerState.cpp

// Awards money and originality levels based on success roll and levels
void AMangakaPlayerState::PublishManga()
{
	// Retrieve player levels
	float WritingLevel = AbilitySystemComponent->GetNumericAttribute(UMangakaAttributeSet::GetWritingLevelAttribute());
	float ArtLevel = AbilitySystemComponent->GetNumericAttribute(UMangakaAttributeSet::GetArtLevelAttribute());
	float CharacterDesignLevel = AbilitySystemComponent->GetNumericAttribute(UMangakaAttributeSet::GetCharacterDesignLevelAttribute());
	float OriginalityLevel = AbilitySystemComponent->GetNumericAttribute(UMangakaAttributeSet::GetOriginalityLevelAttribute());

	// Calculate the average level
	float AverageLevel = (WritingLevel + ArtLevel + CharacterDesignLevel) / 3.0f;

	// Calculate min and max enjoyment based on levels
	float MinScaledEnjoyment = FMath::Clamp(AverageLevel / 100.0f, MinPublicEnjoyment, MaxPublicEnjoyment - 0.5f); // Minimum enjoyment scales with level
	float MaxScaledEnjoyment = FMath::Clamp(0.5f + (AverageLevel / 200.0f), MinPublicEnjoyment + .3f, MaxPublicEnjoyment); // Max scales with level but capped

	// Introduce randomness to the public enjoyment
	float PublicEnjoyment = FMath::RandRange(MinScaledEnjoyment, MaxScaledEnjoyment); // introduces randomness to the reward. Could also be called "SuccessRoll"

	// Calculate reward multiplier based on average level and enjoyment
	float RewardMultiplier = FMath::Lerp(MinRewardMultiplier, MaxRewardMultiplier, FMath::Min(AverageLevel / 100.0f + PublicEnjoyment * (1 - AverageLevel / 100.0f), 1.0f));
	
	// Calculate the base reward 
	int BaseReward = FMath::Clamp(static_cast<int>(RewardMultiplier * BasePublishingReward),
								   static_cast<int>(BasePublishingReward * MinRewardMultiplier),
								   static_cast<int>(BasePublishingReward * MaxRewardMultiplier)); // force rewards to return whole numbers

	// Calculate originality bonus (20G per level above 1)
	int OriginalityBonus = (OriginalityLevel - 1) * 20;
	if (OriginalityBonus < 0) OriginalityBonus = 0;

	// Calculate the final reward including originality bonus
	int FinalReward = BaseReward + OriginalityBonus;

	// Increase originality level randomly by 1 to 3
	int OriginalityIncrease = FMath::RandRange(1, 3);
	float NewOriginalityLevel = OriginalityLevel + OriginalityIncrease;
	AbilitySystemComponent->SetNumericAttributeBase(UMangakaAttributeSet::GetOriginalityLevelAttribute(), NewOriginalityLevel);

	AddMoney(FinalReward);
	OnMangaPublished.Broadcast(PublicEnjoyment, FinalReward);
}
`}
                        </SyntaxHighlighter>
                        <p className="legend">MangakaPlayerState.cpp</p>
                    </div>
                    <div className="code-slide">
                        <SyntaxHighlighter
                            language="cpp"
                            style={nightOwl}
                            customStyle={{
                                width: "90%",
                                height: "90%",
                                background: "#1e1e1e",
                                borderRadius: "8px",
                                padding: ".25rem",
                                boxSizing: "border-box",
                                overflow: "auto",
                            }}
                        >
{`// InteractableActor.cpp
// Showcase of the workstation base class

AInteractableActor::AInteractableActor()
{
	PrimaryActorTick.bCanEverTick = false;

	SceneComponent = CreateDefaultSubobject<USceneComponent>("SceneComponent");
	RootComponent = SceneComponent;

	StaticMeshComponent = CreateDefaultSubobject<UStaticMeshComponent>("StaticMeshComponent");
	StaticMeshComponent->SetupAttachment(SceneComponent);

	MoveToLocation = CreateDefaultSubobject<USceneComponent>("MoveToLocation");
	MoveToLocation->SetupAttachment(SceneComponent);

	AnimationLocation = CreateDefaultSubobject<USceneComponent>("AnimationLocation");
	AnimationLocation->SetupAttachment(SceneComponent);

	ExitLocation = CreateDefaultSubobject<USceneComponent>("ExitLocation");
	ExitLocation->SetupAttachment(SceneComponent);

	SphereComponent = CreateDefaultSubobject<USphereComponent>("Sphere Component");
	SphereComponent->SetupAttachment(SceneComponent);

	ArrowComponent = CreateDefaultSubobject<UArrowComponent>("Arrow Component");
	ArrowComponent->SetupAttachment(SceneComponent);

	ProgressBarWidget = CreateDefaultSubobject<UWidgetComponent>("Progress Bar Widget");
	ProgressBarWidget->SetupAttachment(SceneComponent);
	ProgressBarWidget->SetWidgetSpace(EWidgetSpace::Screen);
	ProgressBarWidget->SetHiddenInGame(true);

	StencilValue = 255;
	wasClicked = false;
	useEnergyDrainEffect = true;
	useProgressEffect = true;
	ProgressBarScale = FVector2D(85.f, 15.f);
	ProgressBarWidget->SetDrawSize(ProgressBarScale);
	isOccupied = false;
	isAssistantDesk = false;
	ShowProgressBar = true;
}

void AInteractableActor::HighlightActor()
{
	if (isAssistantDesk) return;
	
	// bool to make sure we don't repeatedly set the custom depth stencil value to 250. this only needs to run once so we'll set a bool to ensure that happens
	bool hasSetStencilValue = false;

	// Allow the items on the workstation to be highlighted
	for (TObjectPtr<UStaticMeshComponent> Mesh : HighlightMeshes)
	{
		if (IsValid(Mesh))
		{
			Mesh->SetRenderCustomDepth(true);
		}
	}

	// Finally, if we haven't already set the stencil value, set it.
	if (!hasSetStencilValue)
	{
		for (TObjectPtr<UStaticMeshComponent> Mesh : HighlightMeshes)
		{
			if (IsValid(Mesh))
			{
				Mesh->SetCustomDepthStencilValue(StencilValue);
			}
		}
		hasSetStencilValue = true;
	}
}

void AInteractableActor::UnHighlightActor()
{
	for (TObjectPtr<UStaticMeshComponent> Mesh : HighlightMeshes)
	{
		Mesh->SetRenderCustomDepth(false);
	}
}

FVector AInteractableActor::GetMoveToLocation()
{
	wasClicked = true;
	return MoveToLocation->GetComponentLocation();
}

void AInteractableActor::SnapToWorkstation(EMangakaCharacterState StationType)
{
	if (MangakaCharacterRef && !isOccupied)
	{
		// Set some local variables to keep things a little cleaner
		FVector AnimLocation = AnimationLocation->GetComponentLocation();
		FVector ArrowForwardVector = ArrowComponent->GetForwardVector();
		FRotator ArrowRotation = FRotationMatrix::MakeFromX(ArrowForwardVector).Rotator();

		// Set the character location and rotation
		MangakaCharacterRef->GetCharacterMovement()->StopMovementImmediately();
		MangakaCharacterRef->SetActorLocation(AnimLocation, false, nullptr, ETeleportType::TeleportPhysics);
		MangakaCharacterRef->SetActorRotation(ArrowRotation);

		// Set Character data
		MangakaCharacterRef->CharacterState = WorkstationType;
		MangakaCharacterRef->isAtWorkstation = true;
		MangakaCharacterRef->CurrentWorkstation = this;

		wasClicked = false;

		ApplyProgressionEffect();
		
		if (useEnergyDrainEffect & IsValid(EnergyDrainEffect))
		{
			DrainEffectHandle = MangakaCharacterRef->ApplyEffectToSelf(EnergyDrainEffect);
		}

		if (ShowProgressBar)
		{
			ProgressBarWidget->SetHiddenInGame(false);
		}
		
		OnWorkstationEntered();
	}
	else
	{
		// Reset wasClicked
		wasClicked = false;
		
		UE_LOG(LogTemp, Warning, TEXT("MangakaCharacterRef is invalid OR workstation is occupied! Cannot snap to workstation."));
	}
}

// Callback to OnMoveToNewLocation
void AInteractableActor::OnPlayerMoveTo()
{
	// Debug code for testing delegates
	//GEngine->AddOnScreenDebugMessage(-1, 5.f, FColor::Red, TEXT("Player Move To"));
}

// Workstations increase various levels over time, so we need to broadcast that for UI to respond to
// I don't think it was necessary to bind to ALL the attribute change delegates,
// but I was new to GAS and didn't want to waste time backtracking
void AInteractableActor::BindCallbacksToDependencies()
{
	AbilitySystemComponent->GetGameplayAttributeValueChangeDelegate(AttributeSet->GetWritingLevelAttribute()).AddLambda(
		[this](const FOnAttributeChangeData& Data)
		{
			OnWritingLevelChanged.Broadcast(Data.NewValue);
		}
	);
	AbilitySystemComponent->GetGameplayAttributeValueChangeDelegate(AttributeSet->GetArtLevelAttribute()).AddLambda(
		[this](const FOnAttributeChangeData& Data)
		{
			OnArtLevelChanged.Broadcast(Data.NewValue);
		}
	);
	AbilitySystemComponent->GetGameplayAttributeValueChangeDelegate(AttributeSet->GetOriginalityLevelAttribute()).AddLambda(
		[this](const FOnAttributeChangeData& Data)
		{
			OnOriginalityLevelChanged.Broadcast(Data.NewValue);
		}
	);
	AbilitySystemComponent->GetGameplayAttributeValueChangeDelegate(AttributeSet->GetCharacterDesignLevelAttribute()).AddLambda(
		[this](const FOnAttributeChangeData& Data)
		{
			OnCharacterDesignLevelChanged.Broadcast(Data.NewValue);
		}
	);
	AbilitySystemComponent->GetGameplayAttributeValueChangeDelegate(AttributeSet->GetWritingLevelProgressAttribute()).AddLambda(
		[this](const FOnAttributeChangeData& Data)
		{
			OnWritingLevelProgressChanged.Broadcast(Data.NewValue);
		}
	);
	AbilitySystemComponent->GetGameplayAttributeValueChangeDelegate(AttributeSet->GetArtLevelProgressAttribute()).AddLambda(
		[this](const FOnAttributeChangeData& Data)
		{
			OnArtLevelProgressChanged.Broadcast(Data.NewValue);
		}
	);
	AbilitySystemComponent->GetGameplayAttributeValueChangeDelegate(AttributeSet->GetOriginalityLevelProgressAttribute()).AddLambda(
		[this](const FOnAttributeChangeData& Data)
		{
			OnOriginalityLevelProgressChanged.Broadcast(Data.NewValue);
		}
	);
	AbilitySystemComponent->GetGameplayAttributeValueChangeDelegate(AttributeSet->GetCharacterDesignLevelProgressAttribute()).AddLambda(
		[this](const FOnAttributeChangeData& Data)
		{
			OnCharacterDesignLevelProgressChanged.Broadcast(Data.NewValue);
		}
	);
	AbilitySystemComponent->GetGameplayAttributeValueChangeDelegate(AttributeSet->GetProductionProgressAttribute()).AddLambda(
		[this](const FOnAttributeChangeData& Data)
		{
			OnProductionProgressChanged.Broadcast(Data.NewValue);
		}
	);
}

void AInteractableActor::ApplyProgressionEffect()
{
	if (useProgressEffect)
	{
		ProgressEffectHandle = MangakaCharacterRef->ApplyEffectToSelf(ProgressEffect);
	}
}

void AInteractableActor::BeginPlay()
{
	Super::BeginPlay();

	// Set references
	MangakaCharacterRef = Cast<AMangakaCharacter>(UGameplayStatics::GetPlayerCharacter(this,0));
	AMangakaPlayerController* PlayerControllerRef = MangakaCharacterRef->MangakaPlayerController;
	MangakaPlayerStateRef = MangakaCharacterRef->MangakaPlayerState;
	AbilitySystemComponent = MangakaCharacterRef->GetAbilitySystemComponent();
	AttributeSet = Cast<UMangakaAttributeSet>(MangakaCharacterRef->MangakaPlayerState->GetAttributeSet());

	// Bind to delegates
	SphereComponent->OnComponentBeginOverlap.AddDynamic(this, &AInteractableActor::OnOverlapBegin);

	check(AttributeSet);
	BindCallbacksToDependencies();
}

void AInteractableActor::OnOverlapBegin(UPrimitiveComponent* OverlappedComponent, AActor* OtherActor,
	UPrimitiveComponent* OtherComp, int32 OtherBodyIndex, bool bFromSweep, const FHitResult& SweepResult)
{
	if (OtherActor == MangakaCharacterRef && wasClicked == true && !isAssistantDesk && !isOccupied)
	{
		// Make sure to set the workstation type in the workstation's blueprint!
		if (WorkstationType != EMangakaCharacterState::None)
		{
			SnapToWorkstation(WorkstationType);
			isOccupied = true;
		}
		else
		{
			UE_LOG(LogTemp, Warning, TEXT("Workstation type set to None! Set the workstation type in the blueprint!"));
		}
	}
	else
	{
		if (isOccupied) return;
		if (AAssistantCharacter* Assistant = Cast<AAssistantCharacter>(OtherActor))
		{
			// Make sure to set the workstation type in the workstation's blueprint!
			if (WorkstationType != EMangakaCharacterState::None && Assistant->AssignedWorkstationType == WorkstationType && !Assistant->isLeaving)
			{
				Assistant->SnapToWorkstation();
			}
		}
	}
}
`}
                        </SyntaxHighlighter>
                        <p className="legend">InteractableActor.cpp</p>
                    </div>
                </Carousel>
                </div>
            </div>




            <div className="project">
                <div className="project-text">
                    <h2>Clocktergeist</h2>
                    <p> Clocktergeist is an FPS Boss Rush with a focus on combat that won Best Art Direction in the 2025 Boss Rush game jam.
                        Using Unreal Engine, I worked as a programmer and game designer, and was the designer responsible for most of the game's systems.
                        Because I was the most experienced with GAS, I had to create video tutorials and various in-engine showcases 
                        to allow the other team members to use the system properly, which helped solidify many of the GAS concepts for me. 
                        I designed and implemented the grappling hook system (among other things) over a few iterations, and used
                        a clever solution to handle moving grapple targets - homing projectiles. Unfortunately, I faced a health issue that caused
                        me to drop out for about 2 weeks in the middle of the jam, but I started and ended very strong by both providing the template and systems
                        necessary to complete the game at the start of the jam, and polishing/debugging the many loose ends at the jam's close. This game was a lot of fun to 
                        work on and was technically challenging. I have since used GAS in every project and have continued to improve my GAS workflow. This project
                        was mostly coded in blueprint, but the underlying C++ stems from a custom template that's showcased later in this portfolio.
                    </p>
                    <h3>Key Skills & Features</h3>
                    <ul>
                        <li>C++ and Blueprint Programming</li>
                        <li>Gameplay Abilities, Gameplay Effects, Gameplay Tags</li>
                        <li>Complex vector math</li>
                        <li>UI Programming</li>
                        <li>Game Design</li>
                        <li>Debug team members' code</li>
                        <li>Create checkpoint system using Game Instance Subsystem</li>
                        <li>Create and program UI using Common UI</li>
                    </ul>
                    <div className="project-buttons">
                        <a 
                            href="https://veeyuh.itch.io/clocktergeist" 
                            target="_blank" 
                            rel="noreferrer"
                            className="project-btn itch-btn"
                        >
                            <img 
                            src={itchIcon} 
                            alt="Itch.io"
                            className="itch-icon"
                            style={{ width: '1.2rem', height: '1.2rem' }}
                            /> 
                            Play on Itch.io
                        </a>
                    </div>
                </div>
                
                <div className="project-carousel">
                    <Carousel
                    showThumbs={false}
                    showStatus={false}
                    infiniteLoop
                    autoPlay={false}
                    interval={3000}
                    transitionTime={400}
                    stopOnHover
                    emulateTouch={false}
					swipeable={false}
                    >
                    <div className="video-wrapper">
                        <ReactPlayer 
                            src="https://youtu.be/IC3S_fDLqsg?si=fE9UyqjOY2OVf9z3"
                            width="100%"
                            height="100%"
                            controls
                            playing={true}
                            muted={true}
                        />
                    </div>
                    <div className="blueprint-script">
                        <img src={ClocktergeistDesign} alt="Clocktergeist Design"></img>
                        <p className="legend">Clocktergeist Mechanics Design Doc</p>
                    </div>
                    <div className="blueprint-script">
                        <iframe title="Grapplegraph" src="https://blueprintue.com/render/arckyleh/" scrolling="no" allowFullScreen></iframe>
                        <p className="legend">The main event graph for the grapple (use full screen on mobile)</p>
                    </div>
                    <div className="blueprint-script">
                        <iframe title="PullCharacter Function" src="https://blueprintue.com/render/zo01amkr/" scrolling="no" allowFullScreen></iframe>
                        <p className="legend">The function that pulls the character to the grapple target (use full screen on mobile)</p>
                    </div>
                    <div className="blueprint-script">
                        <iframe title="FindBestTarget" src="https://blueprintue.com/render/7q2w8g-g/" scrolling="no" allowFullScreen></iframe>
                        <p className="legend">Find Best Grapple Target (use full screen on mobile)</p>
                    </div>
                    <div className="blueprint-script">
                        <iframe title="Checkpoints" src="https://blueprintue.com/render/e0efgwu0/" scrolling="no" allowFullScreen></iframe>
                        <p className="legend">Simple checkpoint system (use full screen on mobile)</p>
                    </div>
                </Carousel>
                </div>
            </div>





        </div>
    );
}


export default Project;